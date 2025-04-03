
const express=require('express');
const s3Router= express.Router();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();


// Configure AWS S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Endpoint to get a presigned URL for S3 upload
// Server-side debugging
// Add more detailed error logging to the backend
s3Router.post('/get-upload-url', async (req, res) => {
    try {
        const { fileName, fileType } = req.body;

        // Debug: Log received data
        console.log('Request received:', { fileName, fileType });

        if (!fileName || !fileType) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'fileName and fileType are required' });
        }

        // Debug: Log AWS credentials (not the actual values, just if they exist)
        console.log('AWS Credentials check:', {
            region: !!process.env.AWS_REGION,
            accessKey: !!process.env.AWS_ACCESS_KEY,
            secretKey: !!process.env.AWS_SECRET_KEY,
            bucketName: !!process.env.S3_BUCKET_NAME
        });

        // Create a unique key for the file
        const key = `uploads/${Date.now()}-${fileName}`;

        // Set up the parameters for the S3 upload
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: fileType
        };

        // Debug: Log S3 parameters
        console.log('S3 Parameters:', { bucket: params.Bucket, key: params.Key });

        try {
            // Generate the command for putting the object in S3
            const command = new PutObjectCommand(params);

            // Generate a presigned URL that expires in 5 minutes
            const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

            // Generate the public URL for the file
            const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;

            console.log('Generated URLs successfully');

            // Return both URLs to the frontend
            return res.json({ presignedUrl, fileUrl });
        } catch (s3Error) {
            console.error('S3 Error:', s3Error);
            return res.status(500).json({ error: 'S3 Error', message: s3Error.message });
        }

    } catch (error) {
        console.error('General Error:', error);
        return res.status(500).json({ error: 'Failed to generate upload URL', message: error.message });
    }
});

module.exports={s3Router};

