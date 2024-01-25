const express = require('express');
const fetch = require('node-fetch'); // Import node-fetch
const app = express();
const port = 3000;

app.use(express.json());

// Your Clearbit API key
const clearbitToken = 'sk_a95ed05cb6dc8c691928c784da2d8718';
//const CLEARBIT_API_KEY = 'YOUR_CLEARBIT_API_KEY';

app.post('/api/email', async (req, res) => {
    const { email } = req.body;
console.log(email)
    try {
        // Make a request to Clearbit API with authorization header
        const encodedEmail = encodeURIComponent(email);
        const clearbitResponse = await fetch(`https://person.clearbit.com/v2/combined/find?email=${encodedEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ${clearbitToken}',
            },
        });
console.log(clearbitResponse)

        if (clearbitResponse.status === 200) {
            const clearbitData = await clearbitResponse.json();
          //  console.log(clearbitResponse)
            // Handle Clearbit API response here
            res.json({ message: 'Email received and processed successfully.', clearbitData });
        } else {
            res.status(clearbitResponse.status).json({ error: 'Clearbit API request failed.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
