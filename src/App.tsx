import Modal from "./Components/Modals/Modal"
import Navbar from "./Components/Navbar/Navbar"


function App() {


  return (
    <>
      <Navbar/>
      <Modal isOpen={true} onClose={()=>{}} onSubmit={()=>{}} title={'SignUp'}/>
    </>
  )
}

export default App
