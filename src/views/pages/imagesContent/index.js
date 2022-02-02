import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuth } from './imagesContentSlice';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ThumbnailGallery from '../../components/thumbnailGallery';
import UploadImages from '../../components/uploadImages';
import { useForm } from "react-hook-form";

function ImagesContent() {
  const fileArr = useSelector((state) => state.uploadImages.fileArr);
  const accessToken = useSelector((state) => state.uploadImages.accessToken);
  const refreshToken = useSelector((state) => state.uploadImages.refreshToken);
  const error = useSelector((state) => state.uploadImages.error);
  // const previewArr = useSelector([(state) => state.uploadImages.previewArr]);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect((()=>{
    dispatch(fetchAuth());
  }), [dispatch]);

  /**
   * 
   * Отправка файлов по апи
   */
   const onSubmit = ({uploadImagesInput}) => { 
    if(uploadImagesInput && uploadImagesInput.length > 0) {
      console.log(uploadImagesInput);
      return;
    }
    console.log("nothing to upload"); 
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <UploadImages register={register} />
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="purple" type={"submit"}>
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
