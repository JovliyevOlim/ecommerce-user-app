import axiosInstance from "../helpers/axios";
import {categoryConstants} from "./constants";

export function getAllCategory(){
    return async dispatch=>{
                dispatch({type:categoryConstants.GET_ALL_CATEGORIES_REQUEST})
                const res = await axiosInstance.get('category/getcategory');
                console.log(res)
        if (res.status === 200){

            const {categoryList} = res.data
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload:{categories:categoryList}

            })
        }else{
            dispatch({
                type:categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload:{error:res.data.error}
            })
        }
    }
}
