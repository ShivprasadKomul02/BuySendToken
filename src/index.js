import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from "react-moralis";
import App from './App';
import './index.css';


ReactDOM.render(
  <React.StrictMode>  
     <MoralisProvider appId="xWMMw7O10ad5vcQ20IyXdznO5ScjxbhSWLyC8g4l" serverUrl="https://wmxprjztwjxf.usemoralis.com:2053/server">
     <App />
     </MoralisProvider>
  
 
  </React.StrictMode>,
 
  document.getElementById("root"),
);

