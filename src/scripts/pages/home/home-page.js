import StoryApi from '../../data/api';
import { createStoryItemTemplate, createLoadingTemplate, createErrorTemplate } from '../../utils';

const HomePage = {
  async render() {
    return `
      <section class="content">
        <h2 class="content__heading">Explore IDN People Stories</h2>
        <div id="stories" class="stories">
          ${createLoadingTemplate()}
        </div>
        <h2 class="content__heading" style="margin-top: 2rem;">Story Location Map</h2>
        <div id="map" style="height: 400px; width: 100%;"></div>
      </section>
    `;
  },

  async afterRender() {
    try {
        const stories = await StoryApi.getAllStories();
        this._renderStories(stories);
        this._initializeMap(stories);
    } catch (error) {
        this._renderError(error.message);
    }
  },

  _renderStories(stories) {
    const storiesContainer = document.querySelector('#stories');
    storiesContainer.innerHTML = '';
    stories.forEach((story) => {
      storiesContainer.innerHTML += createStoryItemTemplate(story);
    });
  },

  _renderError(message) {
    const storiesContainer = document.querySelector('#stories');
    storiesContainer.innerHTML = createErrorTemplate(message);
  },

  _initializeMap(stories) {
    const map = L.map('map').setView([-6.2088, 106.8456], 5); 

    // a map layer
    const googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
    const googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
    googleStreets.addTo(map);
    const baseLayers = { "Street": googleStreets, "Satelit": googleSat };
    L.control.layers(baseLayers).addTo(map); 

    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`<b>${story.name}</b><br>${story.description.substring(0, 30)}...`);
      }
    });
  }
};

export default HomePage;