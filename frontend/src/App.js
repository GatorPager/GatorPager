import "./App.css";
import React, { Component } from "react";
import Graph from "./Graph";
import axios from "axios"

// sign in form with react

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      password: "",
      passwordConfirmation: "",
      email: "",
      errors: [],
      value: ""
    };
    this.validatingUserOnBlur = this.validatingUserOnBlur.bind(this);
    this.validatePasswordOnBlur = this.validatePasswordOnBlur.bind(this);
    this.validateEmailOnBlur = this.validateEmailOnBlur.bind(this);
    this.validatePasswordConfirmtionOnBlur = this.validatePasswordConfirmtionOnBlur.bind(this)


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  handleButtonClick = () => {
    console.log(this.state.value)
    this.state.value = ""
    axios.get("/search").then(response => {
    
      // console.log(response);
    })

  
    


  }

  submitForm(event) {
    event.preventDefault();
    console.log("submitting the form at this moment...");
    console.log(event);
  }

  displayErrors() {
    return (
      <div className="errors">
        {this.state.errors.map((err, i) => (
          <p key={`err-${i}`}>{err}</p>
        ))}
      </div>
    );
  }

  validateNotEmpty(fieldName, value) {
    if (value.length <= 0) {
      return `Search a page 🐊`;
    }
  }

  validateEmailFormat(fieldName, value) {
    let [lhs, rhs] = value.split("@");
    lhs = lhs || "";
    rhs = rhs || "";

    if (lhs.length <= 0 || rhs.length <= 0) {
      return `${fieldName} not a standard email format.`;
    }
  }
  validatePasswordOnBlur(event) {
    const password = event.target.value;
    const errors = this.state.errors;
    errors[0] = this.validateNotEmpty("Passwrod", password);
    this.setState({ password, errors });
  }

  validatingUserOnBlur = (event) => {
    event.preventDefault();
    const search = event.target.value;
    const errors = this.state.errors;
    errors[0] = this.validateNotEmpty("Username", search);
    this.setState({ search, errors });
  };

  validatePasswordConfirmtionOnBlur(event) {
    const passwordConfirmation = event.target.value;
    const errors = this.state.errors;

    if (passwordConfirmation !== this.state.password) {
      errors.push("Passwords must match.");
    }
    this.setState({ passwordConfirmation, errors });
  }

  validateEmailOnBlur(event) {
    const email = event.target.value;
    const errors = this.state.errors;
    errors[0] = this.validateEmailFormat("Email", email);
    this.setState({ email, errors });
  }
  displayFormDemo() {
    return (
      <div className="input-container ic1">
        <div className="input-container ic2">
          <input
            type="text"
            className="input"
            onBlur={this.validatePasswordOnBlur}
            value={this.state.value} 
            onChange={this.handleChange}
          />
          <div className="cut" />
          <label htmlFor="search" className="placeholder">
            Search
          </label>
        </div>

        <br />
        <div className="input-container ic2">
          <input
            readonly
            type="text"
            required={true}
            readOnly={true}
            value="Iterated 20,000 Pages"
            className="input"
            onBlur={this.validatePasswordOnBlur}
          />
          <div className="cut" />
          <label htmlFor="password" className="placeholder">
            Nodes
          </label>
        </div>

        <br />
        <div className="input-container ic2">
          <input
            readonly
            type="text"
            required={true}
            readOnly={true}
            value="0.003 seconds"
            className="input"
            onBlur={this.validatePasswordOnBlur}
          />
          <div className="cut" />
          <label htmlFor="password" className="placeholder">
            Bellman Ford's
          </label>
        </div>
        <br />
        <div className="input-container ic2">
          <input
            readonly
            type="text"
            required={true}
            readOnly={true}
            value="0.003 seconds"
            className="input"
            onBlur={this.validatePasswordOnBlur}
          />
          <div className="cut" />
          <label htmlFor="password" className="placeholder">
            Dijkstra's {this.state.password}
          </label>
        </div>

        <div className="input-container ic2">
          {/* <button onClick={this.submitForm} className="submit">
            Submit
          </button> */}
        </div>


        {
          //   // event handler for displaying submission response.
        }
        <button onClick={this.handleButtonClick} className="submit">
          Search
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Graph className="form"></Graph>

        <div className="sidebar">
          <div className="title">GatorPages</div>
          <div className="subtitle">A recommended links visualizer</div>
          {this.displayErrors()}

          <div className="form">{this.displayFormDemo()}</div>
        </div>
      </div>
    );
  }
}

export default App;
