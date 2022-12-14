import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../types/authTypes";

import axios from "axios";

export const loadUser = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });
    const config = {
        Headers: {
            'Content-Type': 'application/json',
        }
    }
    await axios.get(`${process.env.SERVER_URL}api/user/`, config).then((res) => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    })
}

export const register = (data) => async (dispatch) => {
    const config = {
        Headers:{
            'Content-Type': 'application/json',
        }
    }

    await axios.post(`${process.env.SERVER_URL}api/user/`, data, config).then((res) => {
        await axios.post(`${process.env.SERVER_URL}api/cart/`, {'userId': res.data?.id, 'quantity': 0}, config).then((res2) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_FAIL,
            msg: err.response.data
        });
    })
}

export const login = (email, password) => async (dispatch) => {
    const config = {
        Headers:{
            'Content-Type': 'application/json',
        }
    }

    await axios.get(`${process.env.SERVER_URL}api/login/${email}/`, config).then((res) => {
        if (res.data.length === 0){
            alert("email not registered")
            dispatch({
                type: LOGIN_FAIL,
                msg: "email not registered"
            })
        } else{
            let emailinDB = res.data[0]?.email
            let passwordinDB = res.data[0]?.password
            if (emailinDB === email && passwordinDB === password){
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data[0]
                })
            } else{
                alert("wrong password")
                dispatch({
                    type: LOGIN_FAIL,
                    msg: "wrong password"
                })
            }
        }
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAIL,
            msg: err.response.data
        });
    })
}

export const logout = () =>async (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
        msg: "logout success"
    })
}