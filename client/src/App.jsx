import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}
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


export default App