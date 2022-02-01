import React, {useState} from 'react';
import { Container, Row, Col, Card, Form, Button, FormLabel } from 'react-bootstrap';
import { CloudUpload } from 'react-bootstrap-icons';

function UploadImagesPage() {
  const [fileArr, setFileArr] = useState([]);
  const [previewArr, setPreviewArr] = useState([]);

  /**
   * 
   * Создание превью и записи файлов в стейт
   */
  const uploadMultipleFiles = (e) => {
    const uploadedFiles = e.target.files;

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
                    <FormLabel className="file-upload-wrapper">
                      <div className={`file-preview ${previewArr.length <= 0 && "file-preview--hidden"}`}>
                        {previewArr.length > 0 && previewArr.map( (preview, index) => 
                          <img src={preview} className="file-preview__item" key={index} />
                        )}
                      </div>
                      <div className={`file-upload ${previewArr.length > 0 && "file-upload--hidden"}`}>
                        <div className="file-upload-content">
                          <div className="file-upload-content__wrapper">
                            <div className="file-upload-content__icon"><CloudUpload /></div>
                            <p className="file-upload-content__title">Перетащите сюда файлы или щелкните для выбора.</p>
                          </div>
                        </div>
                        <Form.Control type="file" className="file-upload__input" onChange={uploadMultipleFiles} accept="image/*" multiple />
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
                  <Card.Subtitle className="text-muted">Зона сортировки миниатюр</Card.Subtitle>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UploadImagesPage;
