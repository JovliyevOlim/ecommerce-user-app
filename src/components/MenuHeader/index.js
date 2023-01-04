import React, {useEffect} from 'react';
import './style.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllCategory} from "../../action";
function MenuHeader(props) {

    const category = useSelector(state => state.category)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCategory())
    },[])

    const renderCategories = (categories)=>{
        let Mycategories =[];
        for(let category of categories){
            Mycategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> :
                            <span>{category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>):null}
                </li>
            )
        }
        return Mycategories;
    }


    return (
        <div className={'menuHeader'}>
            <ul>
                {category.categories.length > 0 ? renderCategories(category.categories): null}
            </ul>
        </div>
    );
}

export default MenuHeader;
