import HomePage from '../pages/home/home-page';
import AddPage from '../pages/add/add-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page'; // Import halaman baru
import UserSession from '../utils/session-storage';

const authGuard = (page) => {
  if (UserSession.getUserToken()) return page;
  return LoginPage;
};

const routes = {
  '/': UserSession.getUserToken() ? HomePage : LoginPage,
  '/login': LoginPage,
  '/register': RegisterPage, // Route baru ditambahkan
  '/home': authGuard(HomePage),
  '/add': authGuard(AddPage),
};
export default routes;