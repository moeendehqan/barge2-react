import './style/style.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Home from './page/home';
import Desk from './page/desk';
import Login from './page/sub/Login';
import Profile from './page/sub/profile';
import Price from './page/sub/price';
import ReturnPay from './page/sub/returnPay';
import Roles from './page/additional/roles';
import Faq from './page/additional/faq';

import ImageToText from './page/sub/imagetotext';
import PdfToWord from './page/sub/pdftoword';
import ConvertDate from './page/sub/convertdate';
import LoremIpsum from './page/sub/loremipsum';
import PdfToText from './page/sub/pdftotext';
import CompressImage from './page/sub/compressimage';
import ImageFromPdf from './page/sub/imagefrompdf';
import CompressPdf from './page/sub/compresspdf';
import MergePdf from './page/sub/mergepdf';
import ExtractColors from './page/sub/extractcolors';
import RemoveBg from './page/sub/removebg';

import LgAdmin from './page/admin/login';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/desk' element={<Desk/>}>
          <Route path='login' element={<Login/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
          <Route path='price' element={<Price/>}></Route>
          <Route path='paid' element={<ReturnPay/>}></Route>
          <Route path='roles' element={<Roles/>}></Route>
          <Route path='faq' element={<Faq/>}></Route>
          <Route path='imagetotext' element={<ImageToText/>}></Route>
          <Route path='pdftoword' element={<PdfToWord/>}></Route>
          <Route path='convertdate' element={<ConvertDate/>}></Route>
          <Route path='loremipsum' element={<LoremIpsum/>}></Route>
          <Route path='pdftotext' element={<PdfToText/>}></Route>
          <Route path='compressimage' element={<CompressImage/>}></Route>
          <Route path='imagefrompdf' element={<ImageFromPdf/>}></Route>
          <Route path='compresspdf' element={<CompressPdf/>}></Route>
          <Route path='mergepdf' element={<MergePdf/>}></Route>
          <Route path='extractcolors' element={<ExtractColors/>}></Route>
          <Route path='removebg' element={<RemoveBg/>}></Route>
        </Route>
        <Route path='/admin' element={<LgAdmin/>}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
