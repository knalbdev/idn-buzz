import UrlParser from './utils/url-parser';
import routes from './routes/routes';
import { ViewTransition } from './utils';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/'];
    
    ViewTransition.start(async () => {
        this._content.innerHTML = await page.render();
        await page.afterRender();
        
        const skipLink = document.querySelector('.skip-to-content');
        const mainContent = document.querySelector('#mainContent');
        skipLink.addEventListener('click', (event) => {
            event.preventDefault();
            mainContent.focus();
        });
    });
  }
}

export default App;