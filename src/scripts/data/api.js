import CONFIG from '../config'; 

const API_ENDPOINT = {
  STORIES: `${CONFIG.BASE_URL}/stories`,
  ADD_STORY: `${CONFIG.BASE_URL}/stories`,
};

class StoryApi {
  // a function for getting all of the stories data
  static async getAllStories() {
    const response = await fetch(API_ENDPOINT.STORIES);
    
    if (!response.ok) {
      throw new Error('Failed to load story');
    }

    const responseJson = await response.json();
    return responseJson.listStory;
  }

  // a function for adding a new story
  static async addNewStory(storyData) {
    const formData = new FormData();
    formData.append('photo', storyData.photo);
    formData.append('description', storyData.description);
    formData.append('lat', storyData.lat);
    formData.append('lon', storyData.lon);

    const response = await fetch(API_ENDPOINT.ADD_STORY, {
      method: 'POST',
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