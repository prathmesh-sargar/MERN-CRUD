
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom'
import GetUsers from './components/GetUsers'
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
       <Router>
        <Routes>
          <Route path="/" element={<GetUsers/>} />
          <Route path="/add" element={<AddUser/>} />
          <Route path="/update/:id" element={<UpdateUser/>} />
        </Routes>
       </Router>
       <Toaster/>
    </>
  )
}

export default App
