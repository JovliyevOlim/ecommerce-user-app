import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import './style.css'
import ProductStore from "./ProductStore";
import {useLocation} from "react-router-dom";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClothingAndAccessories";

function ProductListPage(props) {

    const location = useLocation()

    const renderProduct =()=>{
        const params = getParams(location.search)
        let content = null;
        switch (params.type){
            case 'store':
                content = <ProductStore {...props}/>;
                break;
            case 'page':
                content = <ProductPage {...props} />;
                break;
            default:
                content = <ClothingAndAccessories {...props}/>;
        }

        return content;
    }

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    );
}

export default ProductListPage;
