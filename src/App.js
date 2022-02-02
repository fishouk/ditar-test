import Layout from './views/layout';
import { Routes, Route } from "react-router-dom";
import ImagesContent from  './views/pages/imagesContent';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ImagesContent />} />
      </Routes>
    </Layout>
  );
}

export default App;
