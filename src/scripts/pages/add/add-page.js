import StoryApi from '../../data/api';
import AddPagePresenter from '../../presenters/add-page-presenter';
import { createStoryAddTemplate } from '../../utils';

const AddPage = {
  async render() {
    return createStoryAddTemplate();
  },

  async afterRender() {
    this._presenter = new AddPagePresenter({ view: this, model: StoryApi });
    this._initializeCamera();
    this._initializeMap();
  },

  setupForm(submitCallback) {
    const addStoryForm = document.querySelector('#addStoryForm');
    addStoryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const storyData = this._getFormData();
      if (storyData) {
        submitCallback(storyData);
      }
    });
  },
  
  _getFormData() {
    const description = document.querySelector('#storyDescription').value;
    const lat = document.querySelector('#latitude').value;
    const lon = document.querySelector('#longitude').value;
    if (!this._capturedBlob || !description || !lat) {
      alert('Please complete all of the data: image, description, and please choose the location from the map.');
      return null;
    }
    return { photo: this._capturedBlob, description, lat, lon };
  },

  _initializeCamera() {
    const startCameraBtn = document.querySelector('#startCameraBtn');
    const captureImageBtn = document.querySelector('#captureImageBtn');
    const cameraPreview = document.querySelector('#cameraPreview');
    const imageCanvas = document.querySelector('#imageCanvas');
    const capturedImage = document.querySelector('#capturedImage');
    const defaultImagePreview = document.querySelector('#defaultImagePreview');

    startCameraBtn.addEventListener('click', async () => {
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        defaultImagePreview.style.display = 'none';
        cameraPreview.srcObject = this._stream;
        cameraPreview.style.display = 'block';
        captureImageBtn.style.display = 'inline-block';
        startCameraBtn.style.display = 'none';
        capturedImage.style.display = 'none';
      } catch (error) {
        console.error("Failed to access camera", error);
        alert("Cannot access the camera.");
      }
    });

    captureImageBtn.addEventListener('click', () => {
      const context = imageCanvas.getContext('2d');
      imageCanvas.width = cameraPreview.videoWidth;
      imageCanvas.height = cameraPreview.videoHeight;
      context.drawImage(cameraPreview, 0, 0, imageCanvas.width, imageCanvas.height);
      capturedImage.src = imageCanvas.toDataURL('image/jpeg');
      capturedImage.style.display = 'block';
      imageCanvas.toBlob(blob => { this._capturedBlob = blob; }, 'image/jpeg');
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
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.querySelector('#latitude').value = lat;
      document.querySelector('#longitude').value = lng;
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
      marker.bindPopup(`Location selected: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    });
  },
  
  showLoading() {
    const submitButton = document.querySelector('#submitStoryBtn');
    submitButton.innerText = 'Sending...';
    submitButton.disabled = true;
  },
  showError(message) {
    const submitButton = document.querySelector('#submitStoryBtn');
    alert(`Failed to add story: ${message}`);
    submitButton.innerText = 'Send Story';
    submitButton.disabled = false;
  },
  showSuccessAndRedirect() {
    alert('Story added successfully!');
    window.location.hash = '#/home';
  },

  destroy() {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
    }
  },
};
export default AddPage;