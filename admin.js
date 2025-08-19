// Face Recognition Admin Panel JavaScript

let cameraStream = null
let cameraVideo = null
let captureCanvas = null

// Initialize camera elements when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  cameraVideo = document.getElementById("cameraVideo")
  captureCanvas = document.getElementById("captureCanvas")
})

async function startCamera() {
  try {
    // Request camera access
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user", // Front camera for selfies
      },
    })

    // Set video source
    cameraVideo.srcObject = cameraStream

    // Show video container and capture section
    document.getElementById("videoContainer").style.display = "block"
    document.getElementById("captureSection").style.display = "block"

    // Update button visibility
    document.getElementById("startCameraBtn").style.display = "none"
    document.getElementById("stopCameraBtn").style.display = "inline-block"

    console.log("[v0] Camera started successfully")
  } catch (error) {
    console.error("[v0] Error accessing camera:", error)
    alert("Unable to access camera. Please ensure you have granted camera permissions.")
  }
}

function stopCamera() {
  if (cameraStream) {
    // Stop all video tracks
    cameraStream.getTracks().forEach((track) => track.stop())
    cameraStream = null

    // Hide video elements
    document.getElementById("videoContainer").style.display = "none"
    document.getElementById("captureSection").style.display = "none"

    // Update button visibility
    document.getElementById("startCameraBtn").style.display = "inline-block"
    document.getElementById("stopCameraBtn").style.display = "none"

    console.log("[v0] Camera stopped")
  }
}

function captureAndScan() {
  if (!cameraVideo || !captureCanvas) {
    alert("Camera not properly initialized")
    return
  }

  // Set canvas dimensions to match video
  captureCanvas.width = cameraVideo.videoWidth
  captureCanvas.height = cameraVideo.videoHeight

  // Capture current frame from video
  const context = captureCanvas.getContext("2d")
  context.drawImage(cameraVideo, 0, 0)

  // Convert to blob for potential AWS Rekognition upload
  captureCanvas.toBlob(
    (blob) => {
      console.log("[v0] Face image captured, size:", blob.size, "bytes")

      // TODO: Send blob to AWS Rekognition for face recognition
      // This is where AWS Rekognition integration would be implemented:
      /*
        const formData = new FormData();
        formData.append('image', blob, 'face-capture.jpg');
        
        fetch('/api/rekognition/compare-faces', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + authToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.match && data.confidence > 80) {
                showContentEditor();
            } else {
                showAuthenticationFailed();
            }
        })
        .catch(error => {
            console.error('AWS Rekognition error:', error);
            showAuthenticationFailed();
        });
        */

      // Simulate face recognition process
      simulateFaceRecognition()
    },
    "image/jpeg",
    0.8,
  )
}

function simulateFaceRecognition() {
  const scanStatus = document.getElementById("scanStatus")
  const statusText = document.getElementById("statusText")
  const contentEditor = document.getElementById("contentEditor")

  // Show scanning animation
  scanStatus.style.display = "block"
  statusText.textContent = "Processing captured image..."

  console.log("[v0] Starting face recognition simulation")

  // Simulate AWS Rekognition processing steps
  setTimeout(() => {
    statusText.textContent = "Analyzing facial features..."
  }, 1000)

  setTimeout(() => {
    statusText.textContent = "Comparing with stored biometrics..."
  }, 2000)

  setTimeout(() => {
    statusText.textContent = "Verifying identity match..."
  }, 3000)

  // Simulate successful authentication after 4 seconds
  setTimeout(() => {
    statusText.textContent = "Authentication successful!"
    statusText.style.color = "#10b981" // Green color for success

    // Stop camera after successful authentication
    stopCamera()

    // Show content editor after successful authentication
    setTimeout(() => {
      scanStatus.style.display = "none"
      contentEditor.style.display = "block"
      contentEditor.scrollIntoView({ behavior: "smooth" })
    }, 1000)

    console.log("[v0] Face recognition authentication successful")
  }, 4000)
}

// Save content changes
function saveChanges() {
  const content = document.getElementById("contentTextarea").value

  if (content.trim() === "") {
    alert("Please enter some content before saving.")
    return
  }

  // TODO: Replace with actual content management system integration
  // This is where you would save the content to your CMS or database:
  /*
    fetch('/api/admin/save-content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify({
            content: content,
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Content saved successfully!');
        } else {
            alert('Error saving content: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving content. Please try again.');
    });
    */

  // Simulate successful save
  alert("Content saved successfully!")
  console.log("[v0] Content saved:", content)

  // Clear the textarea
  document.getElementById("contentTextarea").value = ""
}

// Clean up camera stream when page unloads
window.addEventListener("beforeunload", () => {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop())
  }
})

console.log("[v0] Admin panel JavaScript with camera functionality loaded successfully")
