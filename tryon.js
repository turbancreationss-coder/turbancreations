// Turban images (mix of PNG and JPG)
const turbans = [
  "images/tryon.png",
  "images/turban2.jpg",
  "images/turban3.jpg"
];

const userImg = document.getElementById("user-img");
const overlay = document.getElementById("turban-overlay");
const userPhotoInput = document.getElementById("user-photo");

let currentTurban = 0;

// Load face-api.js models
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
  await faceapi.nets.faceLandmark68TinyNet.loadFromUri('./models');
  console.log("Face-api models loaded");
}
loadModels();

// Handle photo upload
userPhotoInput.addEventListener("change", async function(e){
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = async function(){
      userImg.src = reader.result;
      overlay.style.display = "none";

      // Wait for uploaded photo to load
      userImg.onload = async function() {
        await detectFaceAndPlaceTurban();
      };
    };
    reader.readAsDataURL(file);
  }
});

// Show selected turban
function showTurban(index){
  currentTurban = index;
  if(userImg.src){
    detectFaceAndPlaceTurban();
  }
}

// Detect face and position turban
async function detectFaceAndPlaceTurban(){
  const detection = await faceapi.detectSingleFace(userImg, new faceapi.TinyFaceDetectorOptions())
                                  .withFaceLandmarks(true);

  if(!detection){
    alert("No face detected. Please try another photo.");
    overlay.style.display = "none";
    return;
  }

  const landmarks = detection.landmarks;
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  // Calculate forehead position (slightly above eyes)
  const foreheadX = (leftEye[0].x + rightEye[3].x) / 2;
  const foreheadY = Math.min(leftEye[1].y, rightEye[1].y) - 20;

  // Face width for turban scaling
  const faceWidth = rightEye[3].x - leftEye[0].x;
  let turbanWidth = faceWidth * 3.2; // adjust multiplier for best fit
  if(turbanWidth > userImg.width) turbanWidth = userImg.width; // max width limit

  // Load the turban image first
  overlay.src = turbans[currentTurban];
  overlay.onload = () => {
    const turbanHeight = turbanWidth * (overlay.naturalHeight / overlay.naturalWidth);

    // Position turban overlay
    overlay.style.width = turbanWidth + "px";
    overlay.style.left = (foreheadX - turbanWidth / 2) + "px";
    overlay.style.top = (foreheadY - turbanHeight / 2) + "px";
    overlay.style.display = "block";
  };
}
