import CONFIG from '../config';
import UserSession from '../utils/session-storage';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
};

class StoryApi {
  static async login({ email, password }) {
    const response = await fetch(API_ENDPOINT.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.loginResult;
  }

  static async getAllStories() {
    const token = UserSession.getUserToken();
    if (!token) {
      throw new Error('Yo must log in first.');
    }
    const response = await fetch(API_ENDPOINT.STORIES, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.listStory;
  }

  static async addNewStory(storyData) {
    const token = UserSession.getUserToken();
    if (!token) {
      throw new Error('You must login first.');
    }
    const formData = new FormData();
    formData.append('photo', storyData.photo);
    formData.append('description', storyData.description);
    formData.append('lat', storyData.lat);
    formData.append('lon', storyData.lon);

    const response = await fetch(API_ENDPOINT.ADD_STORY, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  }
}

export default StoryApi;