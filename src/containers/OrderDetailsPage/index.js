import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getOrder} from "../../action";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import './style.css'

function OrderDetailsPage(props) {
    const dispatch = useDispatch();
    const params = useParams();
    const orderDetails = useSelector(state => state.user.orderDetails);

    useEffect(() => {
        dispatch(getOrder(params.orderId))
    }, [])

    if (!(orderDetails && orderDetails.address)) {
        return null;
    }

    return (
        <Layout>
            <div
                style={{
                    width: '1160px',
                    margin: '10px auto'
                }}>
                <Card>
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">
                                Phone number {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Actions</div>
                            <div className="delName">Download Invoice</div>
                        </div>
                    </div>
                </Card>

            </div>
        </Layout>
    );
}

export default OrderDetailsPage;
