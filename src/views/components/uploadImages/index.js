import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImagesGenerateThumbnails } from './uploadImagesSlice';

import { Form, FormLabel } from 'react-bootstrap';
import { CloudUpload } from 'react-bootstrap-icons';
import ThumbnailGallery from '../thumbnailGallery';

function UploadImages({}) {
  const [inDropZoneUploadImages, setInDropZoneUploadImages] = useState(false);
  const previewArr = useSelector((state) => state.uploadImages.previewArr);
  const dispatch = useDispatch();

  /**
   * 
   * Загрузка изображений при нажатии на инпут
   */
   const handleUploadMultipleFilesInput = (e) => {
    e.preventDefault();
    dispatch(uploadImagesGenerateThumbnails(e.target.files || []));
  }

  /**
   * 
   * Загрузка изображений drag & drop - файлы сброшены
   */
  const handleDropUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(uploadImagesGenerateThumbnails(e.dataTransfer.files || []));
    setInDropZoneUploadImages(false);
  }
  /**
   * 
   * Загрузка изображений drag & drop - файлы в зоне бросания
   */
  const handleDragEnterUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZoneUploadImages(true);
  }
   /**
   * 
   * Загрузка изображений drag & drop - файлы двигается в зоне бросания
   */
  const handleDragOverUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setInDropZoneUploadImages(true);
  }
  /**
   * 
   * Загрузка изображений drag & drop - файлы вне зоны бросания
   */
  const handleDragLeaveUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInDropZoneUploadImages(false);
  }

  return(
    <FormLabel 
      className="file-upload-wrapper"       
      onDrop={e => handleDropUploadFile(e)}
      onDragOver={e => handleDragOverUploadFile(e)}
      onDragLeave={e => handleDragLeaveUploadFile(e)}
      onDragEnter={e => handleDragEnterUploadFile(e)}
    >
      <ThumbnailGallery thumbnails={previewArr} hidden />
      <div className={`file-upload ${previewArr.length > 0 && "file-upload--hidden"}`}>                        
        <div className="file-upload-content">
          <div className="file-upload-content__wrapper">
            {inDropZoneUploadImages ? (
              <p className="file-upload-content__title">Бросайте.</p>
            ) : (
              <>
                <div className="file-upload-content__icon"><CloudUpload /></div>
                <p className="file-upload-content__title">Перетащите сюда файлы или щелкните для выбора.</p>
              </>
            )}
          </div>
        </div>
        <Form.Control type="file" className="file-upload__input" onChange={e => handleUploadMultipleFilesInput(e)} accept="image/*" multiple />
      </div>
    </FormLabel>
  )
}

export default UploadImages;
