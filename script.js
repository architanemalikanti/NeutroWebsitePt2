const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage() {
  let file = inputFile.files[0];
  uploadFileToS3(file); // Call the function to upload to S3
  let imgLink = URL.createObjectURL(file);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";
}


dropArea.addEventListener("dragover", function(e)){
	e.preventDefault();
}

dropArea.addEventListener("drop", function(e)){
	e.preventDefault();
	inputFile.files = e.dataTransfer.files;
	uploadImage();

}