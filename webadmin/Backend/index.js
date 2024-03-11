const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mime = require('mime-types');

// import * as express from 'express';
const jwt = require('jsonwebtoken');
const secret = 'AI-Project';

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '500mb' }));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "Greeting"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the application if database connection fails
    }
    console.log('Connected to the database successfully');
});

app.get('/', (req, res) => {
    res.send("still");
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * FROM `Admin` WHERE A_Username=?', [username], (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                console.log(results);
                if (results[0].A_Password === password) {

                    res.send("Success"
                    );
                } else {
                    res.send("Fail");
                }
            } else {
                console.log('No admin found with the provided username.');
                res.status(404).send('Admin not found');
            }
        }
    });
});
app.post('/add', (req, res) => {
    const base64Strings = req.body.image; // Expecting an array of base64 strings
    console.log(base64Strings)
    if (!base64Strings || base64Strings.length === 0) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    const { firstname, lastname, gender, birth } = req.body;

    db.query('INSERT INTO `User`(`U_Firstname`, `U_Lastname`, `U_Birthday`, `U_Gender`, `U_Status`) VALUES (?,?,?,?,1)',
        [firstname, lastname, birth, gender], (error, results) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Assuming user is successfully inserted, now handle the images
            const userId = results.insertId;

            // Track if an error occurs while saving images
            let imageSaveErrorOccurred = false;

            const folderPath = path.join(__dirname, 'uploads', `${userId}`);
            fs.mkdirSync(folderPath, { recursive: true });

            base64Strings.forEach((base64String, index) => {
                const timestamp = Date.now();
                const filename = `image_${userId}_${timestamp}_${index}.jpg`;
                const filePath = path.join(folderPath, filename);
                const imageBuffer = Buffer.from(base64String.split(',')[1], 'base64');

                fs.writeFile(filePath, imageBuffer, 'base64', (err) => {
                    if (err) {
                        console.error('Error saving image:', err);
                        imageSaveErrorOccurred = true;
                    }
                });


            });

            if (imageSaveErrorOccurred) {
                
            } else {
                // Assuming images are saved successfully, and database is updated as needed
                
            }

            uid = results.insertId
            db.query("UPDATE `User` SET `U_Picture`=? WHERE UID =?;", [folderPath, uid], (error, results, fields) => {
                if (error) {
                    console.error('Error executing SQL query:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                else {
                    console.log('Image saved successfully:', folderPath);
                    // console.log("result is :",results.insertId)
                    res.status(200).send("suscess")
                }
            })
        });
});


app.get('/peopleList', (req, res) => {

    db.query('SELECT * FROM `User` WHERE U_Status=1;', (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.send({ peopleList: results });
        }
    });
});



app.post('/files', (req, res) => {
    const base64String = req.body.image;
    console.log(base64String)
    res.send("recive")

});

app.post('/queryPerson', (req, res) => {

})
app.post('/savePicKios', (req, res) => {
    const { image, face, uid, gender, age, emotion, time } = req.body;

    if (!image || !face) {
        return res.status(400).json({ error: 'Image and face data are required' });
    }

    const timestamp = Date.now();
    const filename = `image_${timestamp}.jpg`;
    const imagePath = path.join(__dirname, 'eventPicture', filename);
    const imageData = Buffer.from(image, 'base64');

    fs.writeFile(imagePath, imageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            return res.status(500).send('Error saving environment image');
        } else {
            console.log('Environment image saved successfully:', filename);
        }
    });

    const faceFileName = `faceImage_${timestamp}.jpg`;
    const faceImagePath = path.join(__dirname, 'facePicture', faceFileName);
    const faceImageData = Buffer.from(face, 'base64');

    fs.writeFile(faceImagePath, faceImageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving face image:', err);
            return res.status(500).send('Error saving face image');
        } else {
            console.log('Face image saved successfully:', faceFileName);
        }
    });

    // Assuming your `Event` table structure matches the column names here
    // Replace '[value-x]' with actual values you want to insert
    const query = 'INSERT INTO `Event`(`UID`, `FacePicture`, `EnvironmentPicture`, `Gender`, `Emotion`, `EDateTime`) VALUES (?, ?, ?, ?, ?, ?)';

    // Ensure to pass the `time` variable from the request to the query
    db.query(query, [uid, faceFileName, filename, gender, emotion, time], (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Event saved successfully:', results.insertId);
            return res.status(200).send('Event and images received and saved successfully!');
        }
    });
});



app.get('/getPicture', (req, res) => {
    const uploadsPath = path.join(__dirname, 'uploads');
    try {
        // Read the contents of the 'uploads' directory
        const folders = fs.readdirSync(uploadsPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => {
                const folderPath = path.join(uploadsPath, dirent.name);
                const images = fs.readdirSync(folderPath)
                    .filter(file => file.endsWith('.jpg'))
                    .map(image => {
                        const imagePath = path.join(folderPath, image);
                        const imageBase64 = fs.readFileSync(imagePath, 'base64');
                        const mimeType = mime.lookup(imagePath);
                        return { imageName: image, imageBase64, mimeType };
                    });
                return { folderName: dirent.name, images };
            });

        res.json({ folders });
    } catch (error) {
        console.error('Error reading folders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/changeStatus', (req, res) => {
    const UID = req.body.uid;
    db.query('UPDATE `User` SET `U_Status` = 0 WHERE UID = ?;', [UID], (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.send("delete");
        }
    });
});




app.post('/addemotion', (req, res) => {
    console.log(req.body)
    emotion = req.body.emotion;
    text = req.body.text;
    db.query('INSERT INTO `emotion`(`emotion`, `text`) VALUES (?,?);', [emotion, text], (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(results);
            res.send("delete");
        }
    });
});

app.get('/emotionlist', (req, res) => {
    db.query('SELECT `SoundsID`, `emotion`, `text` FROM `emotion` WHERE 1;' , (error, results,fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.send({ emotionlist: results });
        }
    });
});

app.post('/deletesound', (req, res) => {
    const SoundsID = req.body.uid;
    db.query('DELETE FROM `emotion` WHERE 0;', [SoundsID], (error, results, fields) => {
        if (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.send("delete");
        }
    });
});



app.get('/kios', (req, res) => {
    db.query('SELECT * FROM `Event` ORDER BY EID DESC LIMIT 4', (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            res.status(500).send('Error fetching events');
            return;
        }
        res.json(results);
    });
});
const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
