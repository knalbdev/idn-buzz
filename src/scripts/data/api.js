import CONFIG from '../config'; 

const API_ENDPOINT = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
};

const YOUR_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXpzN0hTMHdWSklIenVnbG0iLCJpYXQiOjE3NTA1NTM1ODB9.c9Ybkwcr1bbNjtBz-oGDTWoVFb9R3xbXWgk52IHG81M'; 

class StoryApi {
  static async getAllStories() {
    const response = await fetch(API_ENDPOINT.STORIES, {
      headers: {
        'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to load story');
    }

    const responseJson = await response.json();
    return responseJson.listStory;
  }

  static async addNewStory(storyData) {
    const formData = new FormData();
    formData.append('photo', storyData.photo);
    formData.append('description', storyData.description);
    formData.append('lat', storyData.lat);
    formData.append('lon', storyData.lon);

    const response = await fetch(API_ENDPOINT.ADD_STORY, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${YOUR_AUTH_TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.message || 'Failed to add story');
    }
    
    return response.json();
  }
}

export default StoryApi;