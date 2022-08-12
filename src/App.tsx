import React from 'react';
import History from './components/History';
import Search from './components/Search';
import ZipCode from './components/ZipCode';
import './App.css';


function App() {
  return ( 
      <div className="App">
      <div className="searchContainer">
        <Search />
        <ZipCode />
      </div>
      <div className="historyContainer">
        <History />
      </div>
    </div>
  );
}

export default App;
