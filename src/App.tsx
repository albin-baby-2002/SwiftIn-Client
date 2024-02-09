import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import PersistentLogin from "./HOC/persistentLogin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<PersistentLogin />}>
          <Route index element={<Home />} />
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
