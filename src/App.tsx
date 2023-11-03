import { Toaster } from '@/components/ui/toaster';
import { Route, Routes } from 'react-router-dom';
import Auth from './auth/Auth';
import SignIn from './auth/forms/SignIn';
import SignUp from './auth/forms/SignUp';
import {
  AllUsers,
  BaseLayout,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from './pages';

const App = () => {
  return (
    <main className="h-screen">
      <Routes>
        //* Public Routes
        <Route element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        //! Private Routes
        <Route element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
