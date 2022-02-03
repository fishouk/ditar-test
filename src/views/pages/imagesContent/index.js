import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuth, fetchUploadImages, fetchThumbnails} from './imagesContentSlice';
import { clearUploadImagesThumbnails } from '../../components/uploadImages/uploadImagesSlice';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import SortedThumbnailGallery from '../../components/sortedThumbnailGallery';
import UploadImages from '../../components/uploadImages';
import { useForm } from "react-hook-form";

function ImagesContent() {
  const accessToken = useSelector((state) => state.imagesContent.accessToken);
  const uploadedFilesIdArr = useSelector((state) => state.imagesContent.uploadedFilesIdArr);
  const thumbnails = useSelector((state) => state.imagesContent.thumbnails);
  
  // const previewArr = useSelector([(state) => state.uploadImages.previewArr]);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  useEffect((()=>{
    dispatch(fetchAuth());
  }), []);

  useEffect((()=>{
    if (accessToken && accessToken.length > 0) {
      dispatch(fetchThumbnails(uploadedFilesIdArr, accessToken));
    }
  }), [uploadedFilesIdArr]);

  /**
   * 
   * Отправка файлов по апи
   */
   const onSubmit = ({uploadImagesInput}) => { 
    if(uploadImagesInput && uploadImagesInput.length > 0) {
      if (accessToken && accessToken.length > 0) {
        dispatch(fetchUploadImages(uploadImagesInput, accessToken));
        dispatch(clearUploadImagesThumbnails());
        reset({ uploadImagesInput: '' });
      } else {
        console.log("Токен не получен");
      }
    } else {
      console.log("Nothing to upload"); 
    }
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
                    <Button variant="purple" type={"submit"} disabled={!(accessToken && accessToken.length > 0)}>
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
                  <SortedThumbnailGallery thumbnails={thumbnails} />
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImagesContent;
