import StoryApi from '../../data/api';
import { createRegisterTemplate } from '../../utils';

const RegisterPage = {
  async render() {
    return createRegisterTemplate();
  },

  async afterRender() {
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', this._handleRegister.bind(this));
    }
  },

  async _handleRegister(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const submitButton = document.querySelector('#submitRegister');
    submitButton.disabled = true;
    submitButton.innerText = 'Registering...';

    try {
      await StoryApi.register({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      });
      alert('Registrasi berhasil! Silakan login dengan akun yang baru Anda buat.');
      window.location.hash = '#/login';
    } catch (error) {
      alert(`Registrasi gagal: ${error.message}`);
      submitButton.disabled = false;
      submitButton.innerText = 'Register';
    }
  },
};

export default RegisterPage;