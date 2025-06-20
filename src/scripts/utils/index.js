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
        <h2 class="content__heading">Share Your Story</h2>
        <div class="form-container">
          <form id="addStoryForm">
            <div class="form-group">
              <label for="storyImage">Story Image</label> <div class="camera-wrapper">
                <video id="cameraPreview" width="300" height="300" autoplay style="display: none;"></video>
                <canvas id="imageCanvas" width="300" height="300" style="display: none;"></canvas>
                <img id="capturedImage" src="#" alt="An image preview from the camera" style="display: none; max-width: 300px;"> </div>
              <button type="button" id="startCameraBtn">Open Camera</button>
              <button type="button" id="captureImageBtn" style="display: none;">Capture Image</button>
            </div>
            <div class="form-group">
              <label for="storyDescription">Description</label> <textarea id="storyDescription" name="storyDescription" rows="5" required></textarea>
            </div>
            <div class="form-group">
                <label for="map-add">Choose the Story Location</label> <div id="map-add" style="height: 300px; width: 100%;"></div>
                <input type="hidden" id="latitude" name="latitude">
                <input type="hidden" id="longitude" name="longitude">
            </div>
            <button type="submit" id="submitStoryBtn">Send</button>
          </form>
        </div>
      </section>
`;

const createLoadingTemplate = () => `<div class="loading">Load Story data...</div>`;
const createErrorTemplate = (message) => `<div class="error">An error occured: ${message}</div>`;

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