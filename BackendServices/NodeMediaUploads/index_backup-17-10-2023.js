
app.post('/video-api/save-video', upload.single('video'), async (req, res) => {
       
    // console.log('req: ', req)
    // if (!req || !req.file || req.file.mimetype !== 'video/mp4') {
    //     return res.status(400).send('No valid video file uploaded');
    // }

    // console.log('req: ', req)


    if (!req.body || !req.body.name || !req.body.description) {
        const errorMessage = 'No valid Data, Bitte überprüfe deine Daten (Titel, Description)';
        console.log(errorMessage);

        // Senden Sie die Fehlermeldung über Socket.io
        io.emit('uploadStatus', 'error Message: body is missing or no valid data');

        res.status(500).send(errorMessage);
        return;
    }

    if(!req.file || req.file.mimetype !== 'video/mp4') {
        const errorMessage = 'No valid video file type';
        console.log(errorMessage);

        io.emit('uploadStatus', 'error Message: file is missing or not mp4');
        
        res.status(500).send(errorMessage);
        return;
    }

    // Wenn die Daten gültig sind, sende Erfolgsmeldung über Socket.io
    console.log('Video Data valid')
    io.emit('uploadStatus', 'Video Data valid');

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
                    // fs.unlinkSync(thumbnailPath);

                    io.emit('uploadStatus', 'Thumbnail erstellt und konvertiert');
                    console.log('Thumbnail erstellt und konvertiert')

                } catch (error) {
                    io.emit('uploadStatus', 'Thumbnail Erstellung und Konvertierung Fehler');

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
                        io.emit('uploadStatus', `Paths in Sanity saved under document ID ${res._id}`);

                        console.log(`Paths in Sanity saved under document ID ${res._id}`);
                    }).catch((err) => {
                        io.emit('uploadStatus', 'Save Paths in Sanity failed:', err.message);
                        console.error('Save Paths in Sanity failed: ', err.message)
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

    /* Funktionierende WebM Konvertierung */
    console.log('Starting WebM conversion...');
    io.emit('uploadStatus', 'Starting WebM conversion...');
    await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .outputOptions([
                '-c:v', 'libvpx-vp9',
                '-b:v', '6M',
                '-c:a', 'libopus',
            ])
            .save(webmPath)
            .on('end', () => {
                io.emit('uploadStatus', 'WebM conversion completed.');
                console.log('WebM conversion completed.');
                resolve();
            })
            .on('error', (error) => {
                io.emit('uploadStatus', 'WebM conversion failed.');
                console.error('Error during WebM conversion:', error);
                reject(error);
            });
    });

    // Weitere Verarbeitung, z.B. Speichern der Pfadinformationen in einer Datenbank

    // console.log('Name:', name);
    // console.log('Description:', description);
    // console.log('Video Path:', videoPath);
    // console.log('WebM Path:', webmPath);
    // console.log('Thumbnail Path:', thumbnailPath);

    console.log('Video Sucsessfully Uploaded')
    io.emit('uploadStatus', 'Video successfully uploaded');

    res.status(200).send('Video uploaded successfully');
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).send('Error processing video');
  }
});