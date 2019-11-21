import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class News extends React.Component {


  render() {
    return (
      <div id="nav-bar">
        News
        <div id="inner-nav-bar">
          <div id="nav-item"><a href="index.html">Home</a></div>
          <div id="nav-item"><a href="news.html">Guides</a></div>
          <div id="nav-item"><a href="news.html">Research</a></div>
          <div id="nav-item"><a href="news.html">Market Movers</a></div>
        </div>
      </div>
    )

  }
}
 export default News;
