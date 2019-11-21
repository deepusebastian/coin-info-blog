import React from 'react';
import ReactDOM from 'react-dom';

// ES6

import './App.css';

class Disclaimer extends React.Component {

  constructor(props) {
      super(props);

  }

  render() {
    return (

      <div >

        <p id="form-style-8">

        <h2>Disclaimer</h2>

        No part of CoinDescriptions.com is to be reproduced without our written permission.
        This data has been prepared and issued on the basis of
        publicly available information, internally developed data and other sources believed
        to be reliable. The information contained herein is not guaranteed,
        does not purport to be comprehensive and is strictly for information purposes only.
        Coindescriptions.com does not assume any liability for any direct, indirect or consequential
        loss that may result from the reliance by any person upon any such information or opinions.
        Any expressions of opinions are subject to change without notice. This document does not
        constitute an offer or an invitation to trade or invest. No party should treat any of
        the contents herein as advice.


        </p>
      </div>
    )

  }
}

export default Disclaimer;
