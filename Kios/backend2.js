const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));

app.post('/capture', (req, res) => {
    console.log("recive")
    const data = req.body.image; // ข้อมูลภาพ base64 จากตัวแปร `data:image`
    const base64Data = data.replace(/^data:image\/jpeg;base64,/, ""); // ลบคำนำหน้า base64

    fs.writeFile('pic.jpg', base64Data, 'base64', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving the image');
        }
        res.send('Image received and saved as pic.jpg');
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
