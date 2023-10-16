const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const express = require('express');
const multer = require('multer');
const axios = require('axios');

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

const app = express();

/**
 * Set Cors
 */
const cors = require('cors');

// TODO: withelist wird aktuell nicht genutzt sondern alles ist erlaubt
const whitelist = ['http://localhost:2001', 'http://localhost:3000', 'http://localhost:3333']; // Füge hier deine erlaubten Ursprünge hinzu | aktuell nur Astro Frontend und Sanity Backend

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
       
    // console.log('req: ', req)
    // if (!req || !req.file || req.file.mimetype !== 'video/mp4') {
    //     return res.status(400).send('No valid video file uploaded');
    // }

    const { name, description } = req.body;
    const videoPath = req.file.path; // Hier wird der Pfad zur hochgeladenen Videodatei abgerufen 
    
    // Erstelle Thumbnail
    const thumbnailPath = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}-thumbnail.png`;
    try {
        // Generiere Thumbnail aus dem ersten Frame
        await new Promise((resolve, reject) => {
          ffmpeg(videoPath)
            .screenshots({
              count: 1,
              folder: path.dirname(videoPath),
              filename: path.basename(thumbnailPath),
              // TODO: so erstellen, dass der Nutzer den Zeitpunkt selbst bestimmen kann
              timestamps: ['1'], // Hier den Zeitpunkt in Sekunden angeben, an dem das Thumbnail erstellt werden soll
            })
            .on('end', async () => {

                // Hier kannst du das PNG-Thumbnail in WebP konvertieren und speichern
                const thumbnailPathWebP = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}-thumbnail.webp`;
                try {
                    await sharp(thumbnailPath)
                    .webp() // Konvertiere das PNG in WebP
                    .toFile(thumbnailPathWebP); // Speichere es als WebP

                    // Lösche das temporäre PNG-Thumbnail
                    fs.unlinkSync(thumbnailPath);

                } catch (error) {
                    console.error('Error converting thumbnail to WebP:', error);
                    reject(error);
                }

                // Speichere die Video-Metadaten in Sanity
                // Führe den API-Aufruf zum Speichern in Sanity durch
                try {
                    // await client.create({ _type: 'uploadedVideo', ...videoData });
                    // console.log('Video data saved in Sanity:', videoData);

                    let mp4Path = videoPath
                    let webmPath = videoPath.replace(/\.mp4$/, ".webm");

                    // Hier wird das Video in Sanity gespeichert
                    const doc = {
                        _id: generateUUID(),
                        _type: 'uploadedVideo',
                        name: name,
                        description: description, // Replace with the desired field values
                        // mp4Path: videoPath, // Replace with the desired field values
                        mp4Path: mp4Path, // Replace with the desired field values
                        webmPath: webmPath, // Replace with the desired field values
                        thumbnailPath: thumbnailPath // Replace with the desired field values
                      }

                    client.createOrReplace(doc).then((res) => {
                        console.log(`Video was created, document ID is ${res._id}`)
                    }).catch((err) => {
                        console.error('Oh no, the update failed: ', err.message)
                    })

                    resolve();
                } catch (error) {
                    console.error('Error saving video data in Sanity:', error);
                    reject(error);
                }
            })
            .on('error', (error) => {
                console.error('Error creating PNG thumbnail:', error); // Fehler beim Erstellen des PNG-Thumbnails
                reject(error); // Hier wird der Fehler behandelt und an die Aufrufstelle weitergegeben
            });
        });

    // Konvertiere das Video in das WebM-Format
    const webmPath = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}.webm`; // Pfad zur WebM-Datei
    // await new Promise((resolve, reject) => {
    //     ffmpeg(videoPath)
    //         .outputOptions([
    //             '-c:v', 'libvpx-vp9',
    //             '-b:v', '6M',  // Erhöhe die Bitrate auf 6 Mbps (kann angepasst werden)
    //             '-c:a', 'libopus',
    //         ])
    //         .save(webmPath)
    //         .on('end', resolve)
    //         .on('error', reject);
    // });
    console.log('Starting WebM conversion...');
    await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .outputOptions([
                '-c:v', 'libvpx-vp9',
                '-b:v', '6M',
                '-c:a', 'libopus',
            ])
            .save(webmPath)
            .on('end', () => {
                console.log('WebM conversion completed.');
                resolve();
            })
            .on('error', (error) => {
                console.error('Error during WebM conversion:', error);
                reject(error);
            });
    });

    // Weitere Verarbeitung, z.B. Speichern der Pfadinformationen in einer Datenbank

    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Video Path:', videoPath);
    console.log('WebM Path:', webmPath);
    console.log('Thumbnail Path:', thumbnailPath);

    res.status(200).send('Video uploaded successfully');
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).send('Error processing video');
  }
});

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

// Set port for server
const port = process.env.PORT || 2001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});