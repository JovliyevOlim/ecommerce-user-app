import React, {useEffect} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useParams,useNavigate} from "react-router-dom";
import {addToCart, getProductDetailsBy} from "../../action";
// import {generatePublicUrl} from "../../urlConfig";
import {IoIosStar, IoIosArrowForward, IoMdCart} from 'react-icons/io'
import {BiDollar} from 'react-icons/bi'
import {AiFillThunderbolt} from 'react-icons/ai'
import './style.css'
import {MaterialButton} from "../../components/MaterialUi";

function ProductDetailsPage(props) {

    const navigate =useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)

    useEffect(() => {

        const payload = {
            params: {
                productId: params.productId
            }
        }
        dispatch(getProductDetailsBy(payload))

    }, [])

    if (Object.keys(product.productDetails).length === 0) {
        return null
    }

    return (
        <Layout>
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {
                            product.productDetails.productPictures.map((thumb, index) =>
                                <div key={index} className={'thumbnail active'}>
                                    <img src={(thumb.img)} alt={thumb.img}/>
                                </div>
                            )
                        }
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img style={{width: '100%', height: '95%'}}
                                 src={(product.productDetails.productPictures[0].img)}
                                 alt={`${product.productDetails.productPictures[0].img}`}
                            />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                }}
                                icon={<IoMdCart/>}
                                onClick={()=>{
                                    const {_id,name,price} = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(addToCart({_id,name,price,img}));
                                    navigate('/cart')
                                }}

                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",
                                }}
                                icon={<AiFillThunderbolt/>}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward/>
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward/>
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward/>
                            </li>
                            <li>
                                <a href="#">{product.productDetails.name}</a>
                            </li>
                        </ul>
                    </div>
                    <div className="productDetails">
                        <p className="productTitle">{product.productDetails.name}</p>
                        <div>
                            <span className="ratingCount">4.3 <IoIosStar/></span>
                            <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiDollar/>
                            4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                          <span className="price">
                            <BiDollar/>
                                  {product.productDetails.price}
                         </span>
                         <span className="discount" style={{margin: "0 10px"}}>
                                 22% off
                          </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{display: "flex"}}>
                <span
                    style={{
                        width: "100px",
                        fontSize: "12px",
                        color: "#878787",
                        fontWeight: "600",
                        marginRight: "20px",
                    }}
                >
                  Description
                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                  {product.productDetails.description}
                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductDetailsPage;
