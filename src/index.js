import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NestedMesh from './components/NestedMesh';
import NestedMesh1 from './components/NestedMesh1';
import Tranform from './components/Tranform';
import CallDraggale from './components/CallDraggale';
ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <NestedMesh/> */}
     {/* <CallDraggale/>  */}
    {/* <Tranform/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
