import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import Home from './pages/Dashboard/Home'
import SignUp from './pages/Auth/Signup'
import Signin from './pages/Auth/Signin'

function Root(){
  
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ):(
    <Navigate to='login' />
  )
}


function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />}/>
            <Route path='/login' element={<Signin />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/dashboard' element={<Home />}/>
            <Route path='/income' element={<Income />}/>
            <Route path='/expense' element={<Expense />}/>

          </Routes>
        </Router>
    </div>
  )
}

export default App
