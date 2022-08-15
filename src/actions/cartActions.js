import {
    GET_CART,
    ADD_TO_CART,
    DELETE_FROM_CART,
    CART_LOADING,
    GET_ITEMS_CART,
    ADD_ITEM_TO_CART,
    DELETE_ITEM_FROM_CART,
    CART_ITEM_LOADING,
} from "../types/cartTypes";

import axios from "axios";

export const getCart = (id) => async (dispatch) => {
    dispatch({ type: CART_LOADING });
    const config = {
        Headers: {
            'Content-Type': 'application/json',
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/cart/`, config).then((res) => {
        dispatch({
            type: GET_CART,
            payload: res.data
        });
    })
}

export const addToCart = (id, quantity) => async (dispatch) => {
    dispatch({ type: CART_LOADING });
    const config = {
        Headers: {
            'Content-type': 'application/json',
        }
    }
    await axios.put(`${process.env.SERVER_URL}api/cart/${id}/`, {'userId': id, 'quantity': quantity+1}, config).then((res) => {
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        });
    })
}

export const deleteFromCart = (id, quantity) => async (dispatch) => {
    dispatch({ type: CART_LOADING });
    const config = {
        Headers: {
            'Content-type': 'application/json',
        }
    }
    await axios.delete(`${process.env.SERVER_URL}api/cart/${id}/`, {'userId': id, 'quantity': quantity-1}, config).then((res) => {
        dispatch({
            type: DELETE_FROM_CART,
            payload: res.data
        });
    })
}

export const getItemsCart = (cartId) => async (dispatch) => {
    dispatch({ type: CART_ITEM_LOADING });
    const config = {
        Headers: {
            'Content-type': 'application/json',
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/showItemsCart/${cartId}/`, config).then((res) => {
        dispatch({
            type: GET_ITEMS_CART,
            payload: res.data
        });
    })
}

export const addItemToCart = (cartId, itemId, quantity) => async (dispatch) => {
    const config = {
        Headers: {
            'Content-type': 'application/json',
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/cartItemDetectSameItem/${cartId}/${productId}/`, config).then((res) => {
        if (res.data.length === 0){
            await axios.post(`${process.env.SERVER_URL}api/cartItem/`, {'cartId': cartId, 'productId': productId, 'quanity': 1}, config).then((res2) => {
                dispatch({
                    type: ADD_ITEM_TO_CART,
                    payload: res2.data
                });
            })
        }else{
            await axios.put(`${process.env.SERVER_URL}api/cartItem/id/${res.data[0]?.id}`, {'cartId': cartId, 'productId': productId, 'quanity': res.data[0]?.quantity+1}, config)
        }
    })
}

export const deleteItemFromCart = (id) => async (dispatch) => {
    const config = {
        Headers: {
            'Content-type': 'application/json',
        }
    }
    await axios.delete(`${process.env.SERVER_URL}api/cartItem/${id}/${id}/`,{'userId': id, 'quantity': quantity - 1 },config).then((res) => {
        dispatch({
            type: DELETE_ITEM_FROM_CART,
        });
    })
}
