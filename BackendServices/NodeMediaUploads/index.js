require('dotenv').config();

// const PROJECT_ID = process.env.PROJECT_ID;
// console.log('PROJECT_ID: ', PROJECT_ID)

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const ALLOWED_URLS = process.env.URL;

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const express = require('express');
const multer = require('multer');
const axios = require('axios');

const WebSocket = require('ws');
const http = require('http');


const { createClient } = require('@sanity/client');


// Paths to FFmpeg modules
const ffmpeg = require('fluent-ffmpeg');
console.log('ffmpeg:', ffmpeg);
const ffmpegStatic = require('ffmpeg-static');
console.log('ffmpegStatic:', ffmpegStatic);
const ffprobe = require('ffprobe');
console.log('ffprobe:', ffprobe);
const ffprobeStatic = require('ffprobe-static');
console.log('ffprobeStatic:', ffprobeStatic);

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);



// Init Express 
const app = express();

/**
 * Set Cors
 */
const cors = require('cors');

// TODO: withelist wird aktuell nicht genutzt sondern alles ist erlaubt
const whitelist = ['http://localhost:2001', 'http://localhost:3000', 'http://localhost:3333', 'https://assets.geschmaecker-sind-verschieden.de', 'https://geschmaecker-sind-verschieden.de']; // Füge hier deine erlaubten Ursprünge hinzu | aktuell nur Astro Frontend und Sanity Backend

const corsOptions = {
    origin: true, // Erlaube allen Ursprüngen vorübergehend
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // }
};
app.use(cors(corsOptions)); // Verwende CORS Middleware



/**
 * Socket.io
 */

// Set port for server
const socketPort = process.env.SOCKET_PORT || 2002;
const io = require('socket.io')(socketPort, {
    cors: {
        origin: whitelist,
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('Socket connected: ', socket.id)
    socket.on('custom-event', (eventData) => {
        console.log('eventData: ', eventData)
    })
})

// Sanity Mutation for API Calls
const projectId = 'tz4j4rda';
const sanityToken = 'skK38aYeAs5jn4NxUpxz44qnoR9xPJbk6vdGJ2dFnqFJhyfEDOehJmT4FbeyYqfP5Y4eGOY4OI6RCGsX4bAGqXQFtFgFCqYTw9lCGLbih9zAuV9MetsPfjfUeaPjWIWi94h84CwGvMghEDnxTVqKyD3eFG4y7zOir4lVKwLlXh0wfnnMfny8';

// Sanity Client 
const client = createClient({
    projectId: 'tz4j4rda',
    dataset: 'production',
    apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
    useCdn: true, // `false` if you want to ensure fresh data
    token: sanityToken
})

// const {createClient} = require("@sanity/client");
// const client = createClient({
//     projectId: 'tz4j4rda',
//     dataset: 'production',
//     apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
//     useCdn: true // `false` if you want to ensure fresh data
// })


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// let data = await
// NodeBackend Token: skK38aYeAs5jn4NxUpxz44qnoR9xPJbk6vdGJ2dFnqFJhyfEDOehJmT4FbeyYqfP5Y4eGOY4OI6RCGsX4bAGqXQFtFgFCqYTw9lCGLbih9zAuV9MetsPfjfUeaPjWIWi94h84CwGvMghEDnxTVqKyD3eFG4y7zOir4lVKwLlXh0wfnnMfny8


/**
 * Upload Video Endpoint for Sanity Backend
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/videos'); // Hier wird der Speicherort für die hochgeladenen Videos festgelegt
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, 'video-' + uniqueSuffix + extension); // Hier wird der Dateiname für das hochgeladene Video festgelegt
    }
});

const upload = multer({ storage: storage });

// Video wird unter dem hochgeladenen namen gespeichert und kann über den Pfad abgerufen werden
// TODO: es sollte besser einen namen bekommen, den ich in einer Datenbank speichere und dann über den Namen abrufe
// Außerdem möchte ich die Description und einen standart alt text speichern (description) und dann auch abrufen kann

app.get('/video-api/port-test', (req, res) => {
    res.send('Hallo, ich bin der richtige Port/URL auf "/video-api/port-test"!');
});


app.post('/video-api/save-video', upload.single('video'), async (req, res) => {
    try {
        // TODO: in Frontend überprüfen | Überprüfen Sie die Anforderungsdaten
        if (!req.body || !req.body.name || !req.body.description) {
            const errorMessage = 'No valid Data, Bitte überprüfe deine Daten (Titel, Description)';
            console.log(errorMessage);

            // Senden Sie die Fehlermeldung über Socket.io
            io.emit('uploadStatus', 'error Message: body is missing or no valid data');

            res.status(500).send(errorMessage);
            return;
        }

        if (!req.file || req.file.mimetype !== 'video/mp4') {
            const errorMessage = 'No valid video file type';
            console.log(errorMessage);

            io.emit('uploadStatus', 'error Message: file is missing or not mp4');

            res.status(500).send(errorMessage);
            return;
        }

        // Wenn die Daten gültig sind, senden Sie eine Erfolgsmeldung über Socket.io
        console.log('Video Data valid');
        io.emit('uploadStatus', 'Video Data valid');

        // Wenn die Daten gültig sind, senden Sie eine Erfolgsmeldung über Socket.io
        console.log('Video upload...');
        io.emit('uploadStatus', 'Video upload...');

        const uuid = generateUUID()

        const { name, description, devMode } = req.body;
        const videoPath = req.file.path; // Hier wird der Pfad zur hochgeladenen Videodatei abgerufen

        // create names
        const thumbnailPath = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}-thumbnail.png`;
        const thumbnailPathWebP = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}-thumbnail.webp`;

        const mp4Path = videoPath;
        const webmPath = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}.webm`;

        // Generiere Thumbnail aus dem ersten Frame
        await generateThumbnail(videoPath, thumbnailPath);

        // Hier wird das Video in Sanity gespeichert
        await saveVideoInSanity(uuid, name, description, mp4Path, webmPath, thumbnailPath, thumbnailPathWebP, devMode);

        // Hier kannst du das PNG-Thumbnail in WebP konvertieren und speichern
        await convertToWebP(thumbnailPath, thumbnailPathWebP);

        // Hier kannst du das Video in WebM konvertieren und speichern
        await conventToWebM(uuid, videoPath, webmPath)
            .then((progress) => {
                console.log(`Fortschritt: ${progress}%`);
            })
            .catch((error) => {
                console.error('Fehler beim Berechnen des Fortschritts:', error);
            });

        console.log('Video Sucsessfully Uploaded');
        io.emit('uploadStatus', 'Video successfully uploaded and converted');

        res.status(200).send('Video uploaded successfully');
    } catch (error) {
        console.error('Error processing video:', error);
        res.status(500).send('Error processing video');
    }
});


async function generateThumbnail(videoPath, thumbnailPath) {
    console.log('Generate Thumbnail...');
    io.emit('uploadStatus', 'Generate Thumbnail...');
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                count: 1,
                folder: path.dirname(videoPath),
                filename: path.basename(thumbnailPath),
                timestamps: ['1'],
            })
            .on('end', resolve)
            .on('error', (error) => {
                console.error('Error creating PNG thumbnail:', error);
                reject(error);
            });
    });
}

async function saveVideoInSanity(uuid, name, description, mp4Path, webmPath, thumbnailPath, thumbnailPathWebP, devMode) {
    try {
        const doc = {
            _id: uuid,
            _type: 'uploadedVideo',
            name: name,
            description: description,
            mp4Path: mp4Path,
            webmPath: webmPath,
            thumbnailPath: thumbnailPath,
            thumbnailPathWebP: thumbnailPathWebP,
            webmConversionStatus: 'waiting',
            devMode: devMode === 'true' ? true : false,
        }

        const res = await client.createOrReplace(doc);
        io.emit('uploadStatus', `Save paths in Sanity...`);
        console.log(`Paths in Sanity saved under document ID ${res._id}`);
    } catch (error) {
        io.emit('uploadStatus', 'Save Paths in Sanity failed:', error.message);
        console.error('Save Paths in Sanity failed: ', error.message)
    }
}

async function convertToWebP(inputPath, outputPath) {
    console.log('Convert Thumbnail to Webp...');
    io.emit('uploadStatus', 'Convert Thumbnail to Webp...');
    return new Promise(async (resolve, reject) => {
        try {
            await sharp(inputPath)
                .webp()
                .toFile(outputPath);
            resolve();
        } catch (error) {
            console.error('Error converting thumbnail to WebP:', error);
            reject(error);
        }
    });
}

async function setWebmConversionStatus(uuid, status) {
    try {
        client
            .patch(uuid)
            .set({webmConversionStatus: status})
            .commit()
        io.emit('uploadStatus', `Update converting status to ${status}...`);
        console.error(`Update converting status to ${status}...`)
    } catch (error) {
        io.emit('uploadStatus', 'Error: Set Status to Processing failed:', error.message);
        console.error('Set Status to Processing failed: ', error.message)
    }
}



async function conventToWebM(uuid, videoPath, webmPath) {
    console.log('Starting WebM conversion...');
    io.emit('uploadStatus', 'Starting WebM conversion...');
    await new Promise((resolve, reject) => {
        /* Original ohne Progress */
        // ffmpeg(inputPath)
        //     .outputOptions([
        //         '-c:v', 'libvpx-vp9',
        //         '-b:v', '6M',
        //         '-c:a', 'libopus',
        //     ])
        //     .on('end', () => {
        //         io.emit('uploadStatus', 'WebM conversion completed.');
        //         console.log('WebM conversion completed.');
        //         resolve();
        //     })
        //     .on('error', (error) => {
        //         io.emit('uploadStatus', `WebM conversion failed: ${error.message}`);
        //         console.error('Error during WebM conversion:', error);
        //         reject(error);
        //     })
        //     .save(outputPath);

        // set status to processing
        setWebmConversionStatus(uuid, 'processing');

        const command = ffmpeg(videoPath)
            .output(webmPath)
            .outputOptions([
                '-c:v', 'libvpx-vp9',
                '-b:v', '6M',
                '-c:a', 'libopus',
                '-progress', 'pipe:1', // Aktivieren des Fortschrittsausgabe-Streams
            ])
            .on('stderr', (line) => {
                // Überwachen Sie die stderr-Ausgabe nach Fehlern und geben Sie sie aus
                if (line.includes('Error:')) {
                    console.error('ffmpeg Fehler:', line);
                    reject(line);
                }
            })
            .on('end', () => {
                resolve(100); // Die Konvertierung ist abgeschlossen
            });

        // Überwachen Sie den Fortschritt
        command.on('progress', (progress) => {
            console.log(`Progress: ${progress.percent}%`);
            io.emit('webmConversionProgress', progress.percent);

            // Überprüfen, ob der Fortschritt 99% erreicht hat
            if (progress.percent >= 99) {
                io.emit('webmConversionProgress', 100);
                setWebmConversionStatus(uuid, 'completed');
                resolve(100);
            }
        });

        command.run();
    });
}





/**
 * index.html as test page for Video Upload 
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Get Video for Sanity Backend and Astro Frontend
 */
app.get('/video-api/get-videos', (req, res) => {
    const videoFolder = path.join(__dirname, 'uploads', 'videos');
    fs.readdir(videoFolder, (err, files) => {
        if (err) {
            console.error('Error reading video directory:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const videos = files.map(file => ({
            name: file,
            path: `uploads/videos/${file}`,
            description: 'Video description', // Hier kannst du eine Beschreibung hinzufügen
            }));
            res.json(videos);
        }
    });
});

// expose Video Folder
// app.use('/uploads/videos', express.static('uploads/videos'));
app.use('/video-api/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')));

app.get('/video-api/uploads/videos/:videoName', (req, res) => {
    const videoName = req.params.videoName;
    const filePath = path.join(__dirname, 'uploads', 'videos', videoName);

    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", "video/mp4");

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;

        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        }
        else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });
            
            fileStream.pipe(res);
        }
    });
});


// Set port for server
const port = process.env.PORT || 2001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});





/* Original Script From Ashley Davis
// https://github.com/bootstrapping-microservices/video-streaming-example/blob/master/index.js
// https://blog.logrocket.com/streaming-video-in-safari/
app.get('/works-in-chrome-and-safari', (req, res) => {

    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", "video/mp4");

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;

        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        }
        else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });
            
            fileStream.pipe(res);
        }
    });
});
*/