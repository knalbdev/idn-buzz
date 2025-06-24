import HomePage from '../pages/home/home-page';
import AddPage from '../pages/add/add-page';
import LoginPage from '../pages/login/login-page';
import UserSession from '../utils/session-storage';

const authGuard = (page) => {
  if (UserSession.getUserToken()) return page;
  return LoginPage;
};

const routes = {
  '/': UserSession.getUserToken() ? HomePage : LoginPage,
  '/login': LoginPage,
  '/home': authGuard(HomePage),
  '/add': authGuard(AddPage),
};
export default routes;