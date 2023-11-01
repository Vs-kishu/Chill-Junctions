import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import SignIn from "./auth/forms/SignIn";
import SignUp from "./auth/forms/SignUp";
import { Home } from "./pages";
const App = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          //* Public Routes
          <Route element={<Auth />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
          //! Private Routes
          <Route>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
