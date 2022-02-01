import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { CloudUpload } from 'react-bootstrap-icons';

function uploadImagesPage() {
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
                    <div className={"file-preview file-preview--hidden"}>
                      <img src="" className="file-preview__item" />
                    </div>
                    <div className={"file-upload file-upload--hidden"}>
                      <div className="file-upload-content">
                        <div className="file-upload-content__icon"><CloudUpload /></div>
                        <p className="file-upload-content__title">Перетащите сюда файлы или щелкните для выбора.</p>
                      </div>
                      <Form.Control type="file" className="file-upload__input" onChange={()=>{}} accept="image/*" multiple />
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="purple" type="submit">
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

export default uploadImagesPage;
