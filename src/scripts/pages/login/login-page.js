import StoryApi from '../../data/api';
import { createLoginTemplate } from '../../utils';
import UserSession from '../../utils/session-storage';

const LoginPage = {
  async render() {
    return createLoginTemplate();
  },

  async afterRender() {
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', this._handleLogin.bind(this));
    }
  },

  async _handleLogin(event) {
    event.preventDefault();
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const submitButton = document.querySelector('#submitLogin');
    submitButton.disabled = true;
    submitButton.innerText = 'Logging in...';

    try {
      const response = await StoryApi.login({
        email: emailInput.value,
        password: passwordInput.value,
      });
      UserSession.setUserToken(response.token);
      alert('Login Successful!');
      window.location.hash = '#/home';
      window.location.reload();
    } catch (error) {
      alert(`Login Failed: ${error.message}`);
      submitButton.disabled = false;
      submitButton.innerText = 'Login';
    }
  },
};
export default LoginPage;