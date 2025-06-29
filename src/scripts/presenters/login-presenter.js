import UserSession from '../utils/session-storage.js';

class LoginPresenter {
  constructor(view, model) {
    this._view = view;
    this._model = model;
  }

  async handleLogin(formData) {
    try {
      this._view.showLoading();
      const response = await this._model.login(formData);
      UserSession.setUserToken(response.token);
      this._view.showSuccess('Login Successful!');
      this._view.navigateToHome();
    } catch (error) {
      this._view.showError(`Login Failed: ${error.message}`);
    }
  }

  init() {
    this._view.bindLoginHandler(this.handleLogin.bind(this));
  }
}

export default LoginPresenter;