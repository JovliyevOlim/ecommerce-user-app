import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsPage} from "../../../action";
import getParams from "../../../utils/getParams";
import {useLocation} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from "../../../components/UI/Card";

function ProductPage(props) {
    const location = useLocation()
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const {page} = product

    useEffect(()=>{
        const params = getParams(location.search)
        const payload = {
            params
        }
        dispatch(getProductsPage(payload))
    },[])

    return (
       <div style={{margin:'0 10px'}}>
           <h3>{page.title}</h3>
           <Carousel
                renderThumbs={()=>{}}
           >
               {
                   page.banners && page.banners.map((banner,index)=>
                   <a
                       key={index}
                       style={{display:'block',height:'500px'}}
                       href={banner.navigateTo}
                   >
                       {console.log(banner.img)}
                       <img src={banner.img} style={{width:'100%', height:'100%'}} alt={banner.img}/>
                   </a>
                   )
               }
           </Carousel>
           <div style={{
               display:'flex',
               justifyContent:'center',
               flexWrap:'wrap',
               margin:'10px 0'
           }}>
               {
                   page.products && page.products.map((product,index)=>
                   <Card
                       key={index}
                       style={{width:'200px',height:'200px',margin:'0 5px'}}
                   >
                       <img src={product.img} style={{width:'100%',height:'100%'}} alt=""/>
                   </Card>
                   )
               }
           </div>
       </div>
    );
}

export default ProductPage;
