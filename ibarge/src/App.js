import './style/style.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";

import Home from './page/home';
import Desk from './page/desk';
import Login from './page/sub/Login';
import ImageToText from './page/sub/imagetotext';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/desk' element={<Desk/>}>
          <Route path='login' element={<Login/>}></Route>
          <Route path='imagetotext' element={<ImageToText/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
