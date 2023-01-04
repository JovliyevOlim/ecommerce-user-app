import React, {useEffect, useState} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {addOrder, getAddress, getCartItems} from "../../action";
import Layout from "../../components/Layout";
import {Anchor, MaterialButton, MaterialInput} from "../../components/MaterialUi";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import CartPage from "../CardPage";
import Card from "../../components/UI/Card";

function CheckoutStep(props) {
    return (
        <div className={'checkoutStep'}>
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
}

function Address({
                     selectAddress,
                     confirmDeliveryAddress,
                     enableAddressEditForm,
                     onAddressSubmit,
                     adr
                 }) {
    return (
        <div className={'flexRow addressContainer'}>
            <div>
                <input type="radio" onClick={() => selectAddress(adr)}
                       name='address'/>
            </div>
            <div className={'flexRow sb addressinfo'}>
                {!adr.edit ? (
                    <div style={{width: '100%'}}>
                        <div className={'addressDetail'}>
                            <div>
                                <span className={'addressName'}> {adr.name} </span>
                                <span className={'addressType'}> {adr.addressType} </span>
                                <span className={'addressMobileNumber'}> {adr.mobileNumber} </span>
                            </div>
                            {adr.selected && (
                                <Anchor
                                    name='EDIT'
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                        fontWeight: '500',
                                        color: "#2874f0"
                                    }}
                                />
                            )}
                        </div>
                        <div className={'fullAddress'}>
                            {adr.address} <br/> {" "}
                            {`${adr.state} - ${adr.pinCode}`}
                        </div>
                        {
                            adr.selected &&
                            <MaterialButton
                                title={'DELIVERY HERE'}
                                style={{
                                    width: '200px',
                                    margin: '10px 0'
                                }}
                                onClick={() => confirmDeliveryAddress(adr)}
                            />
                        }
                    </div>
                ) : <AddressForm
                    withoutLayout={true}
                    onSubmitForm={onAddressSubmit}
                    initialData={adr}
                    onCancel={() => {
                    }}
                />
                }
            </div>
        </div>
    )
}

function CheckoutPage(props) {
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart)
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([])
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [confirmOrder, setConfirmOrder] = useState(false);
    const dispatch = useDispatch();

    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    const selectAddress = (addr) => {
        const updatedAddress = address.map(adr => adr._id === addr._id ? {...adr, selected: true} : {
            ...adr,
            selected: false
        })
        setAddress(updatedAddress)
    }

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }
    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map(adr => adr._id === addr._id ? {...adr, edit: true} : {
            ...adr,
            edit: false
        })
        setAddress(updatedAddress)
    }

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
    }

    const onConfirmOrder = () => {
        const totalPrice=Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const {price, qty} = cart.cartItems[key];
                return totalPrice + price * qty;
            },0)
        const items = Object.keys(cart.cartItems).map((key)=>({
            productId:key,
            payablePrice:cart.cartItems[key].price,
            purchasedQty:cart.cartItems[key].qty
        }))
        const payload = {
            addressId:selectedAddress._id,
            totalAmount:totalPrice,
            items,
            paymentStatus:'pending',
            paymentType:'cod'
        }

        console.log(payload)
        dispatch(addOrder(payload))
        setConfirmOrder(true);
    }

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate])

    useEffect(() => {
        const address = user.address.map(adr => ({...adr, selected: false, edit: false}));
        setAddress(address);
        user.address.length === 0 && setNewAddress(true);
    }, [user.address])

    if (confirmOrder) {
        return (
            <Layout>
                <Card>
                    <div>Thank you</div>
                </Card>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className={'cartContainer'} style={{alignItems: 'flex-start'}}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ?
                                <div className={'loggedInId stepCompleted'}>
                                    <span style={{fontWeight: 500}}>{auth.user.fullName}</span>
                                    <span style={{margin: '0 5px'}}>{auth.user.email}</span>
                                </div> :
                                <div>
                                    <MaterialInput
                                        label={'Email'}
                                    />
                                </div>
                        }
                    />

                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {
                                    confirmAddress ?
                                        <div
                                            className={'stepCompleted'}>{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                                        :
                                        address.map(adr =>
                                            <Address
                                                key={adr._id}
                                                selectAddress={selectAddress}
                                                enableAddressEditForm={enableAddressEditForm}
                                                confirmDeliveryAddress={confirmDeliveryAddress}
                                                onAddressSubmit={onAddressSubmit}
                                                adr={adr}
                                            />
                                        )
                                }
                            </>
                        }
                    />


                    {
                        confirmAddress ? null :
                            newAddress ?
                                <AddressForm
                                    onSubmitForm={onAddressSubmit}
                                    onClick={() => setNewAddress(false)}
                                /> : auth.authenticate ? <CheckoutStep
                                    stepNumber={'+'}
                                    title={'ADD NEW ADDRESS'}
                                    active={false}
                                    onClick={() => setNewAddress(true)}
                                /> : null
                    }


                    <CheckoutStep
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ? <CartPage onlyCartItems={true}/> : orderConfirmation ?
                                <div className={'stepCompleted'}>{cart.cartItems.length} items</div> : null
                        }
                    />

                    {
                        orderSummary && <Card
                            style={{
                                margin: '10px 0'
                            }}>
                            <div className={'flexRow sb'}
                                 style={{
                                     padding: '15px 20px',
                                     alignItems: 'center'
                                 }}>
                                <p style={{fontSize: '12px'}}>Order confirmation email will be sent
                                    to <strong>{auth.user.email}</strong></p>
                                <MaterialButton
                                    title="CONTINUE"
                                    onClick={userOrderConfirmation}
                                    style={{
                                        width: '200px'
                                    }}
                                />
                            </div>
                        </Card>
                    }


                    <CheckoutStep
                        stepNumber={'4'}
                        title={'PAYMENT OPTIONS'}
                        active={paymentOption}
                        body={
                            paymentOption && (
                                <div className={'stepCompleted'}
                                     style={{
                                         alignItems: 'center',
                                         padding: '20px'
                                     }}>
                                    <div className={'flexRow'}>
                                        <input type="radio" name={'paymentOption'} value={'cod'}/>
                                        <div>Cash on delivery</div>
                                    </div>
                                    <MaterialButton
                                        title={'CONFIRM ORDER'}
                                        onClick={onConfirmOrder}
                                        style={{
                                            width: '200px',
                                            margin: '0 0 20px 20px'
                                        }}
                                    />
                                </div>
                            )
                        }
                    />
                </div>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const {price, qty} = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}


export default CheckoutPage;
