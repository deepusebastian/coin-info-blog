import React from 'react';
import ReactDOM from 'react-dom';

// ES6

import './App.css';

class DescriptionForm extends React.Component {

  constructor(props) {
      super(props);

  }

  render() {
    return (

      <div >

      <p id="form-style-8">Submit a new coin or a updated description for an existing coin</p>

      <div id="form-style-8">



        <h2>Description</h2>
          <form action="mailto:dsebastian@gmail.com" method="post" >
            <input type="email" name="email" placeholder="Contact Email" />
            <input type="text" name="coinField" placeholder="Coin" />
            <input type="text" name="tickerField" placeholder="Ticker" />
            <input type="text" name="foundedYearField" placeholder="Founded Year" />
            <input type="text" name="marketCapField" placeholder="Market Capital" />
            <input type="text" name="websiteField" placeholder="Website" />
            <input type="text" name="additionalField" placeholder="Additional Info" />
            <input type="text" name="tagsField" placeholder="TAGS" />
            <textarea placeholder="Description Field" onkeyup="adjust_textarea(this)"></textarea>
            <input type="submit" value="Send" />
            <input type="reset" value="Reset" />
          </form>
      </div>

      </div>
    )

  }
}

export default DescriptionForm;
