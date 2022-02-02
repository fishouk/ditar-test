import { configureStore } from '@reduxjs/toolkit';

import uploadImagesReducer from './views/components/uploadImages/uploadImagesSlice';
import imagesContentReducer from './views/pages/imagesContent/imagesContentSlice';

export default configureStore({
  reducer: {
    uploadImages: uploadImagesReducer,
    imagesContent: imagesContentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
