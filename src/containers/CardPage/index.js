import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import CartItem from "./CartItem";
import {addToCart, getCartItems, removeCartItem} from "../../action";
import {MaterialButton} from "../../components/MaterialUi";
import PriceDetails from "../../components/PriceDetails";

function CartPage(props) {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const cartItems = cart.cartItems

    const [cartItems,setCartItems] = useState({})

    useEffect(()=>{
            setCartItems(cart.cartItems)
    },[cart.cartItems])

    useEffect(()=>{
            if (auth.authenticate){
                dispatch(getCartItems())
            }
    },[auth.authenticate])

    const onQuantityIncrement = (_id,qty)=>{
        console.log(cartItems[_id])
        const  {name,price,img} = cartItems[_id]
        dispatch(addToCart({_id,name,price,img,qty},1))
    }

    const onQuantityDecrement = (_id,qty)=>{
        const  {name,price,img} = cartItems[_id]
        dispatch(addToCart({_id,name,price,img,qty},-1))
    }
    const onRemoveCartItem = (_id)=>{
        dispatch(removeCartItem({productId:_id}))
    }

    if (props.onlyCartItems){
        return (
            <>
                {
                    Object.keys(cartItems).map((key,index)=>
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                        />
                    )
                }
            </>

        );
    }

    return (
       <Layout>
           <div className={'cartContainer'}  style={{alignItems:'flex-start'}}>
               <div className={'checkoutContainer'}>
                   <Card
                       headerleft={'My Cart'}
                       headerright={ <div>Deliver to</div>}
                   >

                       {
                           Object.keys(cartItems).map((key,index)=>
                               <CartItem
                                   key={index}
                                   cartItem={cartItems[key]}
                                   onQuantityInc={onQuantityIncrement}
                                   onQuantityDec={onQuantityDecrement}
                                   onRemoveCartItem={onRemoveCartItem}
                               />
                           )
                       }


                       <div
                           style={{
                               width:'100%',
                               display:'flex',
                               background:'#ffffff',
                               justifyContent:'flex-end',
                               boxShadow:'0 0 10px 10px #eee',
                               padding:'10px 0',
                               boxSizing:'border-box'
                           }}>
                           <div style={{width:'250px'}}>
                               <MaterialButton
                                   title={'PLACE ORDER'}
                                   onClick={()=>{
                                       navigate('/checkout')
                                   }}
                               />
                           </div>
                       </div>

                   </Card>
               </div>
               <PriceDetails
                totalItem={Object.keys(cart.cartItems).reduce(function (qty,key){
                    return qty+cart.cartItems[key].qty;
                },0)}
                totalPrice={Object.keys(cart.cartItems).reduce((totalPrice,key)=>{
                    const {price,qty} = cart.cartItems[key];
                    return totalPrice+price*qty;
                },0)}
               />

           </div>
       </Layout>
    );
}

export default CartPage;
