import React, { Component } from 'react';
import './App.css';
import AppBar from './components/navbar/NavBar.js'
import SearchBar from './components/search/Search.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
      <AppBar/>
      <SearchBar/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
