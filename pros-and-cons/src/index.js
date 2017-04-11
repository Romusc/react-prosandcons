import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import FactList from './components/FactList.jsx';
import './index.css';



ReactDOM.render(
  <FactList name="Should I fly around in a balloon house?"/>,
  document.getElementById('main-container')
);
