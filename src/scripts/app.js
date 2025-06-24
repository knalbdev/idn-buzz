import UrlParser from './url-parser';
import routes from './routes/routes';
import { ViewTransition } from './utils';
import UserSession from './utils/session-storage';

class App {
  constructor({ content, logoutButton }) {
    this._content = content;
    this._logoutButton = logoutButton;
    this._currentPage = null;
    this._initialUI();
  }

  _initialUI() {
    if (UserSession.getUserToken()) {
      this._logoutButton.style.display = 'block';
      this._logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        UserSession.removeUserToken();
        alert('You have been logged out.');
        window.location.hash = '#/login';
        window.location.reload();
      });
    } else {
      this._logoutButton.style.display = 'none';
    }
  }

  async renderPage() {
    if (this._currentPage && this._currentPage.destroy) {
      this._currentPage.destroy();
    }

    const url = UrlParser.parseActiveUrlWithCombiner();
    let page = routes[url] || routes['/'];
    
    this._currentPage = page;

    ViewTransition.start(async () => {
      this._content.innerHTML = await page.render();
      await page.afterRender();
      
      const skipLink = document.querySelector('.skip-to-content');
      const mainContent = document.querySelector('#mainContent');
      if (skipLink && mainContent) {
        skipLink.addEventListener('click', (event) => {
          event.preventDefault();
          mainContent.focus();
        });
      }
    });
  }
}
export default App;