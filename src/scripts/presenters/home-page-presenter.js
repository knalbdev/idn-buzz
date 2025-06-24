class HomePagePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;

    this._displayInitialStories();
  }

  async _displayInitialStories() {
    try {
      const stories = await this._model.getAllStories();
      this._view.renderStories(stories);
    } catch (error) {
      this._view.renderError(error.message);
    }
  }
}

export default HomePagePresenter;