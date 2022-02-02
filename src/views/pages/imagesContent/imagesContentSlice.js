import { createSlice } from '@reduxjs/toolkit';

const API = "https://168.119.229.42.sslip.io";

export const imagesContentHelper = createSlice({
  name: 'imagesContent',
  initialState: {
    accessToken: "",
    refreshToken: "",
    error: {},
  },
  reducers: {
    /**
     * 
     * Запись ошибки апи
     */
    apiFailure: (state, action) => {
      state.error = action.payload;
    },
    /**
     * 
     * Запись токенов пользователя
     */
    setAuthTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
})

export const { apiFailure, setAuthTokens } = imagesContentHelper.actions;


/**
 * 
 * Запрос для авторизации на сервере
 */
 export const fetchAuth = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${API}/v1/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {  
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: "test@168.119.229.42.sslip.io", password: "password" }),
      });
      
      const data = await response.json();
      dispatch(setAuthTokens(data))
    } catch (error) {
      console.log(error);
      dispatch(apiFailure(error))
    }
  }
}

export default imagesContentHelper.reducer;
