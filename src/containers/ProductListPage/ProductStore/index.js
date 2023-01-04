import React, {useEffect, useState} from 'react';
import './style.css'
import {generatePublicUrl} from "../../../urlConfig";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductsBySlug} from "../../../action";
import {Link} from "react-router-dom"
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";


function ProductStore(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const priceRange = product.priceRange;

    useEffect(() => {
        dispatch(getProductsBySlug(params.slug))
    }, [])

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card key={index}
                              headerleft={`${params.slug} mobile under ${priceRange[key]}`}
                              headerright={<button>view all</button>}
                              style={{
                                  margin: '20px',
                                  width: 'calc(100% - 40px)'
                              }}
                        >

                            <div style={{display: 'flex'}}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{display: 'block',textDecoration:'none'}}
                                            key={product.name} className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)}/>
                                            </div>
                                            <div className={'productInfo'}>
                                                <div style={{margin: '5px 0'}}>{product.name}</div>
                                                <div>
                                                   <Rating
                                                    value='4.3'
                                                   />
                                                    &nbsp;&nbsp;
                                                    <span
                                                    style={{
                                                        color:'#777',
                                                        fontWeight:'500',
                                                        fontSize:'12px'
                                                    }}
                                                    >(3353)</span>
                                                </div>
                                               <Price value={product.price}/>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>

                        </Card>

                    )
                })
            }
        </>
    );
}

export default ProductStore;
