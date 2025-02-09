// in this file i also write the routes for imports in other funtions
//

export const loginRoute = "/login/";
export const signupRoute = "/signup/";

//
// end route here

// this file contain all the route that we need
//
// importing routing library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// here i import all the pages and components
//
import LoginApp from "./pages/login";
import SignUpApp from "./pages/signup";

// this is the funtion
//
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginRoute} element={<LoginApp />} />
        <Route path={signupRoute} element={<SignUpApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
