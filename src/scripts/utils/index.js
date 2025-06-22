const createStoryItemTemplate = (story) => `
  <article class="story-item">
    <img class="story-item__thumbnail" src="${story.photoUrl}" alt="Story image from ${story.name}">
    <div class="story-item__content">
      <h3 class="story-item__title">${story.name}</h3>
      <p class="story-item__date">${new Date(story.createdAt).toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
      <p class="story-item__description">${story.description}</p>
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
                <button type="button" id="startCameraBtn" class="btn btn-dark">
                  <i class="fas fa-camera"></i> Open Camera
                </button>
                <button type="button" id="captureImageBtn" class="btn btn-primary" style="display: none;">
                  <i class="fas fa-camera-retro"></i> Capture Image
                </button>
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
            <button type="submit" id="submitStoryBtn" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i> Send Story
            </button>
          </form>
        </div>
      </section>
`;

const createLoadingTemplate = () => `<div class="loading">Loading stories...</div>`;

const createErrorTemplate = (message) => `<div class="error">An error occurred: ${message}</div>`;

const ViewTransition = {
  async start(callback) {
    if (!document.startViewTransition) {
      await callback();
      return;
    }
    document.startViewTransition(callback);
  },
};

export { 
  createStoryItemTemplate,
  createStoryAddTemplate, 
  createLoadingTemplate, 
  createErrorTemplate,
  ViewTransition 
};