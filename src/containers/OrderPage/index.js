import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../action";
import {generatePublicUrl} from "../../urlConfig";
import './style.css'
import {Breed} from "../../components/MaterialUi";
import {IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";

function OrderPage(props) {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(getOrders());
    },[])

    return (
        <Layout>
            <div style={{maxWidth:'1160px',margin:'5px auto'}}>
                <Breed
                    breed={[
                        {name:"Home",href:'/'},
                        {name:"My Account",href:'/account'},
                        {name:"My Orders",href:'/account/orders'},
                    ]}
                    breedIcon={<IoIosArrowForward/>}
                />
                {
                    user.orders.map((order)=>{
                        return order.items.map((item)=>
                            <Card style={{maxWidth:'1200px',margin:'5px auto'}}>
                                <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                                    <div className={'orderImgContainer'}>
                                        <img className={'orderImg'}
                                             src={generatePublicUrl(item.productId?.productPictures[0].img)} alt=""/>
                                    </div>
                                    <div className={'orderRow'}>
                                        <div className={'orderName'} style={{width:300}}>{item.productId?.name}</div>
                                        <div className={'orderPrice'}>{item.payablePrice}</div>
                                        <div>{order.paymentStatus}</div>
                                    </div>

                                </Link>
                            </Card>
                        )
                    })
                }
            </div>


        </Layout>
    );
}

export default OrderPage;
