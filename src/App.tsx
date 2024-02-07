
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from "./Pages/Home"

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    
    <Route path='/' element={<Home/>} />
    
    </>
    
  ))

  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
