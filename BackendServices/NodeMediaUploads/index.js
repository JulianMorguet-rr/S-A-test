const path = require('path');
const fs = require('fs');

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
const whitelist = ['http://localhost:1001', 'http://localhost:3000', 'http://localhost:3333']; // Füge hier deine erlaubten Ursprünge hinzu | aktuell nur Astro Frontend und Sanity Backend

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


app.post('/save-video', upload.single('video'), async (req, res) => {
       
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
                // Speichere die Video-Metadaten in Sanity
                // Führe den API-Aufruf zum Speichern in Sanity durch
                try {
                    // await client.create({ _type: 'uploadedVideo', ...videoData });
                    // console.log('Video data saved in Sanity:', videoData);

                    const datasetName = 'production'

                    let mp4Path = videoPath
                    let webmPath = videoPath.replace(/\.mp4$/, ".webm");

                    /*
                    const mutations = {
                        "mutations": [
                            {
                                "create": {
                                    // "_id": "", // Replace with the desired document ID
                                    "_type": "uploadedVideo", // Replace with the desired document type
                                    "name": name, // Replace with the desired field values
                                    "description": description, // Replace with the desired field values
                                    "mp4Path": videoPath, // Replace with the desired field values
                                    "mp4Path": mp4Path, // Replace with the desired field values
                                    "webmPath": webmPath, // Replace with the desired field values
                                    "thumbnailPath": `http://localhost:1001/get-videos${thumbnailPath}`, // Replace with the desired field values
                                    "webmConversionStatus": "pending" // Replace with the desired field values
                                    // Add other fields here
                                }
                            }
                        ]
                    }

                    // const response = await axios(options);
                    // console.log('Sanity API response:', response.data);
                    fetch(`https://${projectId}.api.sanity.io/v2021-03-25/data/mutate/production`, {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${sanityToken}`
                        },
                        body: JSON.stringify(mutations)
                    })
                    .then(response => response.json())
                    .then(result => console.log('Save Sanity result:', result))
                    .catch(error => console.error('Save Sanity results', error))

                    */

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
            .on('error', reject);
        });

    // Konvertiere das Video in das WebM-Format
    const webmPath = `${videoPath.substring(0, videoPath.lastIndexOf('.'))}.webm`; // Pfad zur WebM-Datei
    await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .outputOptions([
                '-c:v', 'libvpx-vp9',
                '-b:v', '6M',  // Erhöhe die Bitrate auf 6 Mbps (kann angepasst werden)
                '-c:a', 'libopus',
            ])
            .save(webmPath)
            .on('end', resolve)
            .on('error', reject);
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
app.get('/get-videos', (req, res) => {
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
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads', 'videos')));


// Set port for server
const port = process.env.PORT || 1001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});