import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid'
import Formatters from 'react-data-grid-addons'
import ImageFormatter from 'react-data-grid-addons'
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup'
import faker from 'faker'
import './App.css';
import Header from './Header'
import SearchTextBox from './SearchTextBox'
import DataGrid from './DataGrid'
import DescriptionForm from './DescriptionForm'
import QuestionForm from './QuestionForm'
import Disclaimer from './Disclaimer'

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        searchTerm: "",
        coinLimit: 1500,
        showDescriptions: true,
        showForm: false,
        showQuestion: false,
        showDisclaimer: false
      };

      this.showForm = this.showForm.bind(this);
      this.showQuestion = this.showQuestion.bind(this);
      this.showDisclaimer = this.showDisclaimer.bind(this);
      this.showDescriptions = this.showDescriptions.bind(this);

    }

  topCoins = () => {
      var coinLimit = 300;
      console.info("Changing to 300");
      this.setState({coinLimit});
    }

    allCoins = () => {
      var coinLimit = 1500;
      console.info("Changing to 1500");
      this.setState({coinLimit});
    }

  mySearchCallBack = (searchField) => {
    var searchTerm = searchField;
    var showDescriptions = true;
    var showForm = false;
    var showDisclaimer = false;
    var showQuestion = false;
    this.setState({showDescriptions});
    this.setState({showForm});
    this.setState({showDisclaimer});
    this.setState({showQuestion});
    this.setState({searchTerm});
  }

  showDescriptions(event) {
    var showDescriptions = true;
    var showForm = false;
    var showDisclaimer = false;
    var showQuestion = false;
    this.setState({showDescriptions});
    this.setState({showForm});
    this.setState({showDisclaimer});
    this.setState({showQuestion});

  }

  showForm(event) {
    var showDescriptions = false;
    var showForm = true;
    var showDisclaimer = false;
    var showQuestion = false;
    this.setState({showDescriptions});
    this.setState({showForm});
    this.setState({showDisclaimer});
    this.setState({showQuestion});


  }

  showQuestion(event) {
    var showDescriptions = false;
    var showForm = false;
    var showDisclaimer = false;
    var showQuestion = true;
    this.setState({showDescriptions});
    this.setState({showForm});
    this.setState({showDisclaimer});
    this.setState({showQuestion});

  }

  showDisclaimer(event) {
    var showDescriptions = false;
    var showForm = false;
    var showDisclaimer = true;
    var showQuestion = false;
    this.setState({showDescriptions});
    this.setState({showForm});
    this.setState({showDisclaimer});
    this.setState({showQuestion});

  }



  render() {


    return (

            <div id="body">
                <div id="header">

                  <div id="left-banner">
                    <div id="logo">
                        <Header />
                    </div>
                  </div>

                </div>
                  <div id="middle">

                    <div id="left-banner">
                      <div id="search">
                        <SearchTextBox mySearchCallBack={this.mySearchCallBack}/>
                      </div>
                    </div>

                    <div id="middle-banner">
                      <div id="nav-links">
                        <button className="nav-button" onClick={this.showDescriptions}>Coins</button>
                        <button className="nav-button" onClick={this.showForm}>Add Description</button>
                        <button className="nav-button" onClick={this.showQuestion}>Question</button>
                        <button className="nav-button" onClick={this.showDisclaimer}>Disclaimer</button>
                      </div>
                    </div>

                  </div>


                  {this.state.showDescriptions && <div id="data-grid">
                        <DataGrid searchTerm={this.state.searchTerm} key={this.state.coinLimit}
                                  coinLimit={this.state.coinLimit}/>
                  </div>}

                  {this.state.showForm && <div id="data-grid">
                      <DescriptionForm/>
                  </div>}

                  {this.state.showQuestion && <div id="data-grid">
                          <QuestionForm/>
                  </div>}

                  {this.state.showDisclaimer && <div id="data-grid">
                          <Disclaimer/>
                  </div>}



          </div>

      );
    }

}




export default App;
