import Layout from './views/layout';
import { Routes, Route } from "react-router-dom";
import UploadImagesPage from  './views/pages/uplaodImages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UploadImagesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
