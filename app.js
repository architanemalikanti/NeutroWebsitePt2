require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

// Configure AWS with your region and credentials
AWS.config.update({
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Log the values of environment variables
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

const s3 = new AWS.S3();

// Endpoint to generate a pre-signed URL
app.get('/generate-presigned-url', (req, res) => {
  const params = {
    Bucket: 'neutropdf', // Your bucket name
    Key: 'exampleFileName', // The file name or key for the upload
    Expires: 60, // Expiration time in seconds
    ContentType: 'image/jpeg', // Optional. Set this if you want to restrict the content type
  };

  // Generate the pre-signed URL
  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Error generating pre-signed URL', err);
      return res.sendStatus(500);
    }
    res.json({ url });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
