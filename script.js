const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

// Function to handle file upload
function uploadImage() {
    // Check if any files were selected
    if (inputFile.files.length > 0) {
        const file = inputFile.files[0];
        getPresignedUrlAndUpload(file);
    }
}

// Function to get pre-signed URL and upload the file
function getPresignedUrlAndUpload(file) {
    fetch('/generate-presigned-url', {
        method: 'GET', // Or POST, depending on your server setup
        // You might need to send additional data to your server, depending on how you've implemented your pre-signed URL generation
    })
    .then(response => response.json())
    .then(data => {
        const uploadUrl = data.url;
        uploadFileToS3(file, uploadUrl);
    })
    .catch(error => {
        console.error('Error fetching pre-signed URL:', error);
    });
}

// Function to upload the file to S3
function uploadFileToS3(file, uploadUrl) {
    fetch(uploadUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': file.type, // Make sure this matches the ContentType you specified when generating the pre-signed URL
        },
        body: file,
    })
    .then(response => {
        if (response.ok) {
            console.log('Upload successful');
            displayImage(file); // Display image after successful upload
        } else {
            console.error('Upload failed');
        }
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
}

// Function to display the image in the div#img-view
function displayImage(file) {
    let imgLink = URL.createObjectURL(file);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.innerHTML = ''; // Clear the content
}

// Adjusted event listeners for drag and drop
dropArea.addEventListener("dragover", function(e) {
    e.preventDefault();
}, false);

dropArea.addEventListener("drop", function(e) {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
}, false);

// Add change event listener to the file input
inputFile.addEventListener("change", uploadImage, false);
