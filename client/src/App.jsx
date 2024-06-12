import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import CreateListing from "./pages/CreateListing"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import store from "./redux/store";

const App = () => {
  return (
   <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-listing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
   </Provider>
  );
};
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Home />}>
//     <Route path='/singin' element={<SignIn />} />
//     <Route path='/singup' element={<SignUp />} />
//     <Route path='/about' element={<About />} />
//     <Route path='/profile' element={<Profile />} />
//     </Route>
//   )
// );
// function App() {
//   <>
//     <Header />
//     <RouterProvider router={router} />
//   </>
// }



export default App;
