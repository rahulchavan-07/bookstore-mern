import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch ,useSelector} from 'react-redux'
import { authActions } from './store/auth'
import { useEffect } from 'react'
import Favourites from './components/profile/Favourites'
import UserOrderHistory from './components/profile/UserOrderHistory'
import Setting from './components/profile/Setting'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
import SeeUser from "./pages/SeeUser";

function App() {
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);
  useEffect(()=>{

    if(
      localStorage.getItem("id") && 
      localStorage.getItem("token") && 
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[]);
  return (

    <div>
       <Navbar/>

       <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/all-books' element={<AllBooks/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/profile' element={<Profile/>}>
            {role=="user" ? <Route index element={<Favourites/>}/>: <Route index element={<AllOrders/>}/>}
            {role=="admin" && <Route path="/profile/add-book" element={<AddBook/>}/>}
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
            <Route path="/profile/settings" element={<Setting/>}/>
          </Route>
          <Route exact path='/SignUp' element={<SignUp/>}/>
          <Route exact path='/LogIn' element={<Login/>}/> 
          <Route exact path='/updateBook/:id' element={<UpdateBook/>}/>         
          <Route exact path='/view-book-details/:id' element={<ViewBookDetails/>}/> 
          <Route path="/see-user" element={<SeeUser />} />    
       </Routes>

       <Footer/>
       
    </div>
  )
}

export default App
