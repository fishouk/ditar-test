import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "https://168.119.229.42.sslip.io";

export const imagesContentHelper = createSlice({
  name: 'imagesContent',
  initialState: {
    accessToken: "",
    refreshToken: "",
    uploadedFilesIdArr: [],
    thumbnails: [],
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
    /**
     * 
     * Запись id загруженных изображений
     */
     setUploadedFilesIdArr: (state, action) => {
      state.uploadedFilesIdArr = [...state.uploadedFilesIdArr, ...action.payload];
    },
    /**
     * 
     * Сброс id загруженных изображений
     */
     setClearUploadedFilesIdArr: (state) => {
      state.uploadedFilesIdArr = [];
    },
    /**
     * 
     * Запись изображений полученных по апи по Id
     */
    setThumbnailsById: (state, action) => {
      const existedThumnails = JSON.parse(JSON.stringify(state.thumbnails));

      const existedThumbnailId = existedThumnails.findIndex((item => item.id === action.payload.id));
      if (existedThumbnailId >= 0) {
        state.thumbnails[existedThumbnailId].thumbnail = action.payload.thumbnail;
        state.thumbnails[existedThumbnailId].loading = action.payload.loading;
        return;
      }

      const thumbnail= {
        id: action.payload.id,
        thumbnail: action.payload.thumbnail,
        loading: action.payload.loading,
      };
    
      state.thumbnails = [...state.thumbnails, thumbnail];
    },
    /**
     * 
     * Удаление изображения по апи по Id
     */
    deleteThembnailById: (state, action) => {
      state.thumbnails = state.thumbnails.filter(item => item.id === action.payload ? false : item);
    }
  },
})

export const { apiFailure, setAuthTokens, setUploadedFilesIdArr, setClearUploadedFilesIdArr, setThumbnailsById, deleteThembnailById } = imagesContentHelper.actions;


/**
 * 
 * Запрос для авторизации на сервере
 */
 export const fetchAuth = () => {
  return async dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${API}/v1/auth/login`,
        data: JSON.stringify({ email: "test@168.119.229.42.sslip.io", password: "password" }),
        headers: { 'Content-Type': 'application/json', },
      })
      .then(response => response.data)
      .then(data=>resolve(dispatch(setAuthTokens(data))))
      .catch(error => dispatch(apiFailure(reject(error))));
    });
  }
}

/**
 * 
 * Запрос для загрузки изображений
 */
 export const fetchUploadImages = (images, accessToken) => {
  return async dispatch => {
    let promiseArray = [];
    for (let i = 0; i < images.length; i++ ) {
      promiseArray.push(fetchUploadImage(images[i], accessToken));
    }
    Promise.all(promiseArray)
            .then(values => dispatch(setUploadedFilesIdArr(values)))
            .then(dispatch(setClearUploadedFilesIdArr()));
  }
}

/**
 * 
 * Запрос для загрузки изображения
 */
 export const fetchUploadImage = (image, accessToken) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("photo", image);
      
      axios({
        method: "post",
        url: `${API}/v1/photos/upload`,
        data: formData,
        headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type':'multipart/form-data' },
      })
      .then(response => resolve(response.data[0].id))
      .catch(error => reject(error));
  });
}

/**
 * 
 * Запрос для получения изображений
 */
 export const fetchThumbnails = (Ids, accessToken) => {
  return async dispatch => {
    for (let i = 0; i < Ids.length; i++ ) {
      dispatch(setThumbnailsById({id: Ids[i], thumbnail: "", loading: true}));
      fetchThumbnail(Ids[i], accessToken).then(response => dispatch(setThumbnailsById({id: Ids[i], thumbnail: response, loading: false})));
    }
  }
}

/**
 * 
 * Запрос для получения изображения
 */
 export const fetchThumbnail = (id, accessToken) => {
    return new Promise((resolve, reject) => {
      axios.get(
        `${API}/v1/photos/load-thumbnail/${id}`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
          responseType: 'blob',
        }
      )
      .then(response => resolve(URL.createObjectURL(new Blob([response.data]))))
      .catch(error => reject(error));
  });
}

/**
 * 
 * Запрос для удаления изображения по Id
 */
export const fetchDeleteThembnailById = (id, accessToken) => {
  return async dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(
        `${API}/v1/photos/delete/${id}`,
        {
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        }
      )
      .then(response => resolve(dispatch(deleteThembnailById(id))))
      .catch(error => reject(error));
    })
  }
}

export default imagesContentHelper.reducer;
