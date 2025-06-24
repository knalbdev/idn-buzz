import 'regenerator-runtime';
import '../styles/styles.css';
import App from './app';

const app = new App({
  content: document.querySelector('#mainContent'),
  logoutButton: document.querySelector('#logoutButton'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});