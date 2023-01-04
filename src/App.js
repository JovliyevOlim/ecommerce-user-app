import './App.css';
import HomePage from "./containers/HomePage";
import MenuHeader from "./components/MenuHeader";
import {BrowserRouter as Router, Routes ,Route} from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react";
import {isUserLoggedIn, updateCart} from "./action";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CardPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";


function App() {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth);

    useEffect(()=>{
        if (!auth.authenticate){
            dispatch(isUserLoggedIn())
        }
    },[auth.authenticate])

    useEffect(()=>{

       dispatch(updateCart())
    },[auth.authenticate])

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/' exact element={<HomePage/>}/>
                <Route path='/cart'  element={<CartPage/>}/>
                <Route path='/checkout'  element={<CheckoutPage/>}/>
                <Route path='/account/orders'  element={<OrderPage/>}/>
                <Route path='/order_details/:orderId'  element={<OrderDetailsPage/>}/>
                <Route path="/:productSlug/:productId/p"  element={<ProductDetailsPage/>}/>
                <Route path="/:slug"  element={<ProductListPage/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
