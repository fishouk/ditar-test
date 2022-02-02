import { configureStore } from '@reduxjs/toolkit';

import uploadImagesReducer from './views/components/uploadImages/uploadImagesSlice';

export default configureStore({
  reducer: {
    uploadImages: uploadImagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})
