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
    const base64String = req.body.image;

    if (!base64String) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    const imageBuffer = Buffer.from(base64String.split(',')[1], 'base64');
    const { firstname, lastname, gender, birth } = req.body;
    db.query(
        'INSERT INTO `User`(`U_Firstname`, `U_Lastname`, `U_Birthday`, `U_Gender`,`U_Status`) VALUES (?,?,?,?,?)',
        [firstname, lastname, birth, gender,1],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing SQL query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                // console.log('User data inserted successfully:', results.insertId); 
                // res.json({ message: 'Image and user data uploaded successfully' });
                // Generate a unique filename (you may need a more robust solution)
                const timestamp = Date.now();
                const filename = `image_${results.insertId}_${timestamp}.jpg`;

                // Create folder if it doesn't exist
                const folderPath = path.join(__dirname, 'uploads', `${results.insertId}`);
                fs.mkdirSync(folderPath, { recursive: true });  // recursive: true creates parent directories if they don't exist

                // Specify the path to save the image
                const filePath = path.join(folderPath, filename);

                // Save the image to the server
                fs.writeFile(filePath, imageBuffer, 'base64', (err) => {
                    if (err) {
                        console.error('Error saving image:', err);
                        res.status(500).json({ error: 'Failed to save image' });
                    } else {
                        // UPDATE `User` SET `U_Picture`='path' WHERE UID ="38";
                        uid=results.insertId
                        db.query("UPDATE `User` SET `U_Picture`=? WHERE UID =?;",[folderPath,uid],(error,results,fields)=>{
                            if(error){
                                console.error('Error executing SQL query:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                            }
                            else{
                                console.log('Image saved successfully:', folderPath);
                                // console.log("result is :",results.insertId)
                                res.status(200).send("suscess")
                            }
                        })
                        


                    }
                });
            }
        }
    );

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
    const image = req.body.image;
    const face = req.body.face;
    // console.log(image);

    if (!image && !face) {
        return res.status(400).json({ error: 'Image data is required' });
    }


    const timestamp = Date.now();
    const filename = `image_${timestamp}.jpg`;
    const imagePath = path.join(__dirname, 'eventPicture', filename); // Use path.join to create a full file path
    const imageData = Buffer.from(image, 'base64');
    console.log(imageData)
    fs.writeFile(imagePath, imageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image Environment');
        } else {
            console.log('Image saved successfully:', filename);
            // res.status(200).send('Image received and saved successfully!');
        }
    });

    const faceFileName = `faceImage_${timestamp}.jpg`;
    const faceImagePath = path.join(__dirname, 'facePicture', faceFileName); // Use path.join to create a full file path
    const faceImageData = Buffer.from(face, 'base64');
    fs.writeFile(faceImagePath, faceImageData, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image face');
        } else {
            console.log('Image saved successfully:', faceFileName);
            res.status(200).send('Image received and saved successfully!');
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


const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
