const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// import * as express from 'express';
const jwt = require('jsonwebtoken');
const secret = 'AI-Project';

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '5mb' }));

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

    // Generate a unique filename (you may need a more robust solution)
    const filename = `image_${firstname}${lastname}.png`;

    // Create folder if it doesn't exist
    const folderPath = path.join(__dirname, 'uploads', `${firstname}${lastname}`);
    fs.mkdirSync(folderPath, { recursive: true });  // recursive: true creates parent directories if they don't exist

    // Specify the path to save the image
    const filePath = path.join(folderPath, filename);

    // Save the image to the server
    fs.writeFile(filePath, imageBuffer, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).json({ error: 'Failed to save image' });
        } else {
            console.log('Image saved successfully:', filePath);
            
            db.query(
                'INSERT INTO `User`(`U_Firstname`, `U_Lastname`, `U_Picture`, `U_Birthday`, `U_Gender`) VALUES (?,?,?,?,?)',
                [firstname, lastname, filename, birth, gender],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error executing SQL query:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        console.log('User data inserted successfully:', results);
                        res.json({ message: 'Image and user data uploaded successfully' });
                    }
                }
            );
        }
    });
});


app.get('/peopleList', (req, res) => {
    
    db.query('SELECT * FROM `User`', (error, results, fields) => {
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

app.post('/queryPerson',(req,res)=>{
    
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

const port = 5001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
