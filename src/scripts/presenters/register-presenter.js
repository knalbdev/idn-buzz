class RegisterPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;
  }

  async handleRegister(formData) {
    try {
      this._view.showLoading();
      await this._model.register(formData);
      this._view.showSuccess('Register Succecssful. Please Login with the account that you have created.');
      this._view.navigateToLogin();
    } catch (error) {
      this._view.showError(`Register Failed: ${error.message}`);
    }
  }

  init() {
    this._view.bindRegisterHandler(this.handleRegister.bind(this));
  }
}

export default RegisterPresenter;