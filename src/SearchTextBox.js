import React from 'react';
import ReactDOM from 'react-dom';

// ES6

import './App.css';

class SearchTextBox extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        callbackToParent: "",

      };

      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.submitSearch = this.submitSearch.bind(this);
    }

   handleSearchChange(event) {
     var callbackToParent = event.target.value;
     this.setState({callbackToParent});
     //this.props.mySearchCallBack(callbackToParent);
     //console.info("Callback " + callbackToParent);

   }

   submitSearch(event) {
     var callbackToParent = this.state.callbackToParent;
     this.props.mySearchCallBack(callbackToParent);
     console.info("Callback " + callbackToParent);

   }

  render() {
    return (
      <div id="search-area">

        <div id="search-box-container">
          <input type="text" className="search-box"
            onChange={this.handleSearchChange}
            value={this.state.callbackToParent}
            placeholder=""
            fitLineLength={false}/>
        </div>

        <div id="search-button-container">
          <button
            onClick={this.submitSearch}
            className="search-button">Search</button>
        </div>
      </div>
    )

  }
}

export default SearchTextBox;
