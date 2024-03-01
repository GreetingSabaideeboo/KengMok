import React from 'react';
import axios from 'axios';

function Test() {
    const Show = async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/getPicture');
            console.log(data)
            const imageBase64 = data.folders[3].images[0].imageBase64;

            const space = document.getElementById('pic');
            const pic = document.createElement('img');

            // Use the base64 data as a data URL
            pic.src = `data:${data.folders[0].images[0].mimeType};base64,${imageBase64}`;

            space.appendChild(pic);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div>
            Test
            <br />
            <button onClick={Show}>Test</button>

            <div id='pic'>
                
            </div>
        </div>
    );
}

export default Test;
