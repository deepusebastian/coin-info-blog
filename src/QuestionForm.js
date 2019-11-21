import React from 'react';
import ReactDOM from 'react-dom';

// ES6

import './App.css';

class QuestionForm extends React.Component {

  constructor(props) {
      super(props);

  }

  render() {
    return (
      <div id="form-style-8">
        <h2>Ask a Question</h2>
          <form action="mailto:dsebastian@gmail.com" method="post" >
            <input type="email" name="email" placeholder="Contact Email" />
            <input type="text" name="question" placeholder="Question" />
            <input type="submit" value="Send" />
            <input type="reset" value="Reset" />

          </form>
      </div>
    )

  }
}

export default QuestionForm;
