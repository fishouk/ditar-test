import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ThumbnailGallery from '../../components/thumbnailGallery';
import UploadImages from '../../components/uploadImages';

function ImagesContent() {
  const fileArr = useSelector((state) => state.uploadImages.fileArr);
  // const previewArr = useSelector([(state) => state.uploadImages.previewArr]);
  const dispatch = useDispatch();

   /**
   * 
   * Отправка файлов по апи
   */
    const uploadFiles = (e) => {
      e.preventDefault();
      console.log(fileArr);
  }

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
                    <UploadImages />
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
                  {/* <ThumbnailGallery thumbnails={previewArr} /> */}
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImagesContent;
