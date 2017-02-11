import React, { Component } from 'react';
import Workspace from './components/Workspace';

export const modalStyle = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    top: '40px',
    left: '300px',
    bottom: '40px',
    right: '300px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

class App extends Component {
  render() {
    return (

      <div className='container main-body-container'>
      <Workspace/>
      </div>
    );
  }
}

export default App;
