import { createSlice } from '@reduxjs/toolkit';

export const uploadImagesHelper = createSlice({
  name: 'uploadImages',
  initialState: {
    previewArr: [],
  },
  reducers: {
    /**
     * 
     * Создание превью и записи файлов в стейт
     */
    uploadImagesGenerateThumbnails: (state, action) => {
      const uploadedFiles = action.payload;

      if (uploadedFiles && uploadedFiles.length > 0) {
        const previewsForUploadFiles = [];
        for (let i = 0; i < uploadedFiles.length; i++) {
          previewsForUploadFiles.push(URL.createObjectURL(uploadedFiles[i]));
        }
        state.previewArr = previewsForUploadFiles;
      }
    },
  },
})

export const { uploadImagesGenerateThumbnails } = uploadImagesHelper.actions;

export default uploadImagesHelper.reducer;
