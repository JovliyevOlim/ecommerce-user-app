import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsBySlug} from "../../../action";
import {Link, useParams} from "react-router-dom";
import Card from "../../../components/UI/Card";
import {generatePublicUrl} from "../../../urlConfig";
import './style.css'

function ClothingAndAccessories(props) {

    const product = useSelector(state => state.product);
    const dispatch = useDispatch();
    const params = useParams()

    useEffect(()=>{
        dispatch(getProductsBySlug(params.slug))
    },[])

    return (
        <div style={{padding:'10px'}}>
            <Card
                style={{
                    boxSizing:'border-box',
                    padding:'10px',
                    display:'flex'
                }}
            >
                {
                    product.products.map((product)=>
                        <div className={'caContainer'}>
                            <Link className={'caImgContainer'}
                                to={`/${product.slug}/${product._id}/p`}
                            >
                                <img src={generatePublicUrl(product.productPictures[0].img)} alt={product.productPictures[0].img}/>
                            </Link>
                            <div>
                                <div className={'caProductName'}>{product.name}</div>
                                <div className={'caProductPrice'}>{product.price}</div>
                            </div>
                        </div>
                    )
                }



            </Card>

        </div>
    );
}

export default ClothingAndAccessories;
