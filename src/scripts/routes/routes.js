import HomePage from '../pages/home/home-page';
import AddPage from '../pages/add/add-page';
import AboutPage from '../pages/about/about-page'; 

const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/add': AddPage, 
  '/about': AboutPage,
};

export default routes;