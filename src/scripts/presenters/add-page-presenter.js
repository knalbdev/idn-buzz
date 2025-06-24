class AddPagePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;

    this._view.setupForm(this.handleFormSubmit.bind(this));
  }

  async handleFormSubmit(storyData) {
    try {
      this._view.showLoading();
      await this._model.addNewStory(storyData);
      this._view.showSuccessAndRedirect();
    } catch (error) {
      this._view.showError(error.message);
    }
  }
}

export default AddPagePresenter;