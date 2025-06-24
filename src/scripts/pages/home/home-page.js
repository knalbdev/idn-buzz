import StoryApi from '../../data/api';
import HomePagePresenter from '../../presenters/home-page-presenters';
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
    new HomePagePresenter({
      view: this,
      model: StoryApi,
    });
  },

  // FUNGSI INI DIPERBARUI MENJADI LEBIH SEDERHANA DAN AMAN
  renderStories(stories) {
    const storiesContainer = document.querySelector('#stories');
    storiesContainer.innerHTML = ''; // Kosongkan container

    if (!stories || stories.length === 0) {
      storiesContainer.innerHTML = '<p class="error">No stories to display at the moment.</p>';
      this._initializeMap([]); // Tetap inisialisasi peta kosong
      return;
    }

    // Langsung render semua cerita, template akan menangani jika ada data kosong
    stories.forEach((story) => {
      storiesContainer.innerHTML += createStoryItemTemplate(story);
    });

    this._initializeMap(stories);
  },

  renderError(message) {
    const storiesContainer = document.querySelector('#stories');
    storiesContainer.innerHTML = createErrorTemplate(message);
  },

  _initializeMap(stories) {
    const map = L.map('map').setView([-6.2088, 106.8456], 5);
    const MAPTILER_API_KEY = 'Pr1kaqoqoJWS5JYG0w3S';
    const streets = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`, {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    });
    const satellite = L.tileLayer(`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${MAPTILER_API_KEY}`, {
      attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    });
    streets.addTo(map);
    const baseLayers = { "Street": streets, "Satelit": satellite };
    L.control.layers(baseLayers).addTo(map);
    stories.forEach(story => {
      if (story && story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`<b>${story.name || 'No Title'}</b><br>${(story.description || '').substring(0, 30)}...`);
      }
    });
  },
};

export default HomePage;