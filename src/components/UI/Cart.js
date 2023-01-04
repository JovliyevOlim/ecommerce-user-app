import React from 'react';
import {IoIosCart} from "react-icons/io";


function Cart(props) {
    return (
        <div style={{fontSize:'20px',position:'relative',display:'flex',alignItems:'center'}}>
            <span style={{
                position:'absolute',
                background:'red',
                width:'15px',
                height:'15px',
                borderRadius:'5px',
                fontSize:'12px',
                border:'1px solid #fff',
                textAlign:'center',
                alignSelf:'center',
                top:'-12px',
                right:'-6px'
            }}>
                {props.count}
            </span>
            <IoIosCart/>
        </div>
    );
}

export default Cart;
