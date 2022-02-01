import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, FormLabel } from 'react-bootstrap';
import { CloudUpload } from 'react-bootstrap-icons';

function UploadImagesPage() {
  const [fileArr, setFileArr] = useState([]);
  const [previewArr, setPreviewArr] = useState([]);
  const [inDropZoneUploadImages, setInDropZoneUploadImages] = useState(false);

  /**
   * 
   * Создание превью и записи файлов в стейт
   */
  const uploadMultipleFiles = (arr = []) => {
    const uploadedFiles = arr;

    console.log(uploadedFiles);
    if (uploadedFiles && uploadedFiles.length > 0) {
      setFileArr(uploadedFiles);
      
      const previewsForUploadFiles = [];
      for (let i = 0; i < uploadedFiles.length; i++) {
        previewsForUploadFiles.push(URL.createObjectURL(uploadedFiles[i]));
      }
      setPreviewArr(previewsForUploadFiles);
    }
  }

  /**
   * 
   * Загрузка изображений при нажатии на инпут
   */
   const handleUploadMultipleFilesInput = (e) => {
    e.preventDefault();
    uploadMultipleFiles(e.target.files);
  }

  /**
   * 
   * Загрузка изображений drag & drop - файлы сброшены
   */
  const handleDropUploadFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadMultipleFiles(e.dataTransfer.files);
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

   /**
   * 
   * Отправка файлов по апи
   */
    const uploadFiles = (e) => {
      e.preventDefault();
      console.log(previewArr);
  }
    // console.log(fileArr);
    // console.log(previewArr);

  return (
    <div className="py-5">
      <Container>
        <Row className="mb-1">
          <Col>
            <p className="text-uppercase fw-bold">Загрузка фото</p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Subtitle className="text-muted mb-1">Загрузка фото</Card.Subtitle>
                <Form>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <FormLabel 
                      className="file-upload-wrapper"       
                      onDrop={e => handleDropUploadFile(e)}
                      onDragOver={e => handleDragOverUploadFile(e)}
                      onDragLeave={e => handleDragLeaveUploadFile(e)}
                      onDragEnter={e => handleDragEnterUploadFile(e)}
                    > <div className="file-upload">
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
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="purple" onClick={uploadFiles}>
                      Отправить фото
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
                <Card.Body>
                  <Card.Subtitle className="text-muted mb-4">Зона сортировки миниатюр</Card.Subtitle>
                    <div className={`file-preview ${previewArr.length <= 0 && "file-preview--hidden"}`}>
                      {previewArr.length > 0 && previewArr.map( (preview, index) => 
                        <img src={preview} className="file-preview__item" key={index} />
                      )}
                    </div>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UploadImagesPage;
