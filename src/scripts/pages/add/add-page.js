import StoryApi from '../../data/api';
import { createStoryAddTemplate } from '../../utils'; 

const AddPage = {
  async render() {
    return createStoryAddTemplate();
  },

  async afterRender() {
    this._setupForm();
  },

  _setupForm() {
    const addStoryForm = document.querySelector('#addStoryForm');
    this._initializeCamera();
    this._initializeMap();

    addStoryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const description = document.querySelector('#storyDescription').value;
        const lat = document.querySelector('#latitude').value;
        const lon = document.querySelector('#longitude').value;
        
        if (!this._capturedBlob || !description || !lat) {
            alert('Please complete all of the data: image, description, and choose your location from the map.');
            return;
        }

        const storyData = {
            photo: this._capturedBlob,
            description,
            lat,
            lon,
        };

        try {
            document.querySelector('#submitStoryBtn').innerText = 'Sending...';
            document.querySelector('#submitStoryBtn').disabled = true;
            
            await StoryApi.addNewStory(storyData);
            
            alert('Success to add a new Story!');
            window.location.hash = '#/home';
        } catch (error) {
            alert(`Failed to add a new Story: ${error.message}`);
            document.querySelector('#submitStoryBtn').innerText = 'Send a Story';
            document.querySelector('#submitStoryBtn').disabled = false;
        }
    });
  },

  _initializeCamera() {
    const startCameraBtn = document.querySelector('#startCameraBtn');
    const captureImageBtn = document.querySelector('#captureImageBtn');
    const cameraPreview = document.querySelector('#cameraPreview');
    const imageCanvas = document.querySelector('#imageCanvas');
    const capturedImage = document.querySelector('#capturedImage');

    startCameraBtn.addEventListener('click', async () => {
        try {
            // accessing the camera 
            this._stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            cameraPreview.srcObject = this._stream;
            cameraPreview.style.display = 'block';
            captureImageBtn.style.display = 'inline-block';
            startCameraBtn.style.display = 'none';
        } catch (error) {
            console.error("Failed to access the camera", error);
            alert("Unable to access the camera.");
        }
    });

    captureImageBtn.addEventListener('click', () => {
        const context = imageCanvas.getContext('2d');
        imageCanvas.width = cameraPreview.videoWidth;
        imageCanvas.height = cameraPreview.videoHeight;
        context.drawImage(cameraPreview, 0, 0, imageCanvas.width, imageCanvas.height);

        capturedImage.src = imageCanvas.toDataURL('image/jpeg');
        capturedImage.style.display = 'block';

        // capture the image data from the camera 
        imageCanvas.toBlob(blob => {
            this._capturedBlob = blob;
        }, 'image/jpeg');

        // stopping the camera stream after it's already not in use 
        this._stream.getTracks().forEach(track => track.stop());
        cameraPreview.style.display = 'none';
        captureImageBtn.style.display = 'none';
    });
  },

  _initializeMap() {
    const map = L.map('map-add').setView([-6.2088, 106.8456], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;
    // clicek event for capturing a long lat coordinate
    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        document.querySelector('#latitude').value = lat;
        document.querySelector('#longitude').value = lng;

        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
        marker.bindPopup(`Chosen Location: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    });
  }
};

export default AddPage;