// File: src/scripts/utils/index.js

const createStoryItemTemplate = (story) => `
  <article class="story-item">
    <img class="story-item__thumbnail" 
         src="${story.photoUrl || 'https://via.placeholder.com/400x250?text=No+Image'}" 
         alt="Story image from ${story.name || 'Unknown User'}">
    <div class="story-item__content">
      <h3 class="story-item__title">${story.name || 'No Title'}</h3>
      <p class="story-item__date">${new Date(story.createdAt).toLocaleDateString('id-ID', {year: 'numeric', month: 'long', 'day': 'numeric'})}</p>
      <p class="story-item__description">${story.description || 'No description available.'}</p>
    </div>
  </article>
`;

const createStoryAddTemplate = () => `
    <section class="content">
        <h2 class="content__heading">Share Your Amazing Story</h2>
        <div class="form-container">
          <form id="addStoryForm">
            <div class="form-group">
              <label for="storyImage">Story Image</label>
              <div class="camera-wrapper">
                <img id="defaultImagePreview" src="images/image.png" alt="Default story image placeholder" class="camera-placeholder-image">
                <video id="cameraPreview" autoplay muted playsinline style="display: none;"></video>
                <canvas id="imageCanvas" style="display: none;"></canvas>
                <img id="capturedImage" src="#" alt="An image preview from the camera" style="display: none;">
              </div>
              <div class="camera-buttons">
                <button type="button" id="startCameraBtn" class="btn btn-dark"><i class="fas fa-camera"></i> Open Camera</button>
                <button type="button" id="captureImageBtn" class="btn btn-primary" style="display: none;"><i class="fas fa-camera-retro"></i> Capture Image</button>
              </div>
            </div>
            <div class="form-group">
              <label for="storyDescription">Description</label>
              <textarea id="storyDescription" name="storyDescription" rows="5" required placeholder="Tell your story..."></textarea>
            </div>
            <div class="form-group">
                <label for="map-add">Choose the Story Location</label>
                <div id="map-add" style="height: 300px; width: 100%; border-radius: 12px;"></div>
                <input type="hidden" id="latitude" name="latitude">
                <input type="hidden" id="longitude" name="longitude">
            </div>
            <button type="submit" id="submitStoryBtn" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Send Story</button>
          </form>
        </div>
      </section>
`;

// FUNGSI BARU UNTUK TEMPLATE LOGIN
const createLoginTemplate = () => `
  <section class="content">
    <h2 class="content__heading">Login to IDN Buzz</h2>
    <div class="form-container">
      <form id="loginForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required value="user-story@dicoding.com">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required value="123456">
        </div>
        <button type="submit" id="submitLogin" class="btn btn-primary">Login</button>
      </form>
      <div class="form-link">
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </div>
    </div>
  </section>
`;

// FUNGSI BARU UNTUK TEMPLATE REGISTER (JIKA BELUM ADA)
const createRegisterTemplate = () => `
  <section class="content">
    <h2 class="content__heading">Create Your Account</h2>
    <div class="form-container">
      <form id="registerForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required minlength="6">
        </div>
        <button type="submit" id="submitRegister" class="btn btn-primary">Register</button>
      </form>
      <div class="form-link">
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </div>
    </div>
  </section>
`;

const createLoadingTemplate = () => `<div class="loading">Loading stories...</div>`;
const createErrorTemplate = (message) => `<div class="error">An error occurred: ${message}</div>`;
const ViewTransition = {
  async start(callback) {
    if (!document.startViewTransition) { await callback(); return; }
    document.startViewTransition(callback);
  },
};

// PERBAIKAN: MENAMBAHKAN createLoginTemplate & createRegisterTemplate KE DALAM EXPORT
export {
  createStoryItemTemplate,
  createStoryAddTemplate,
  createLoginTemplate,
  createRegisterTemplate,
  createLoadingTemplate,
  createErrorTemplate,
  ViewTransition,
};