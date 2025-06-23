import StoryApi from '../../data/api';
import { createLoginTemplate } from '../../utils';
import UserSession from '../../utils/session-storage';

const LoginPage = {
  async render() {
    return createLoginTemplate();
  },

  async afterRender() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', this._handleLogin.bind(this));
  },

  async _handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const submitButton = document.querySelector('#submitLogin');
    submitButton.disabled = true;
    submitButton.innerText = 'Logging in...';

    try {
      const response = await StoryApi.login({ email, password });
      UserSession.setUserToken(response.token);
      
      alert('Login Successful! Redirecting to Main Page');
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