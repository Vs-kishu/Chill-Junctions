import { Toaster } from '@/components/ui/toaster';
import { Route, Routes } from 'react-router-dom';
import Auth from './auth/Auth';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import { BaseLayout, Home } from './pages';

const App = () => {
  return (
    <main>
      <Routes>
        //* Public Routes
        <Route element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        //! Private Routes
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
