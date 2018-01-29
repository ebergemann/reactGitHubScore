import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './ui-tool/css/nm-cx/main.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      publicRepos: '',
      followers: '',
      success: '',
      notFound: ''

    }
  }

  handleInput({target}){
    console.log(target);
    this.setState({username: target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log(e.target);
    let url = "https://api.github.com/users/" + this.state.username;
    const promise = axios.get(url);
    promise.then(response => {
      console.log(response.data);
      this.setState({publicRepos: response.data.public_repos, followers: response.data.followers, username: '', success: true, notFound: false});  
    })
    promise.catch(err => {
      console.log(err.response.status);
      this.setState({notFound: true, success: false, username: ''});
      // console.log(data);
    })
  }


  render() {
    let score = this.state.followers + this.state.publicRepos;
    return (
      <div className="App">
        <div className="row">
        <div className="medium-12 columns">
            <h1>GitHub Score</h1>
          </div>
        </div>

        <div className="row">
          <div className="medium-1 columns"><span>&nbsp;</span>
          </div>
          <div className="medium-5 columns">
            <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="md-text-field">
              <input onChange={this.handleInput.bind(this)} id="input1" type="text" placeholder="Enter Github User Name" value={this.state.value} />
              {/* <label for="input_1">Github Username</label> */}
            </div>
            </div>
{this.state.username.trim() === '' &&
            <div className="row">
            <button disabled className="button btn-cta small">Calculate my Github Score</button>
            </div>}
{this.state.username.trim() !== '' &&
  <div className="row">
  <button className="button btn-cta small">Calculate my Github Score</button>
  </div>}
            </form>

          </div>
          <div className="medium-5 columns">
          {this.state.success && 
            <div>
              <div className="row">
              <span>&nbsp;</span>
            </div>
            <div className="row">
              <h2>Your Score: {score ? score : 0}</h2>
            </div>
           <ScoreMsg score={score} />
           </div>
          }
          {this.state.notFound && 
            <div>
              <div className="row">
              <span>&nbsp;</span>
            </div>
            <div className="row">
              <h4 style={{color: 'red'}}>User does not exist, pick a different GitHub username</h4>
            </div>
           
           </div>
          }
          </div>
          <div className="medium-1 columns"><span>&nbsp;</span>
          </div>

        </div>

      </div>
    );
  }
}

function ScoreMsg(props){
  let scr = props.score;
  let clr = '';
  let msg = '';
  if (scr < 20){
    clr = 'red'; 
    msg = 'Needs Work!'
  } else if (scr >=20 && scr < 50) {
    clr = 'orange';
    msg = 'A decent Start!';
  } else if (scr >=50 && scr < 100){
    clr = 'black';
    msg = "Doing good!";
  } else if (scr >=100 && scr < 200){
    clr = 'green';
    msg = 'Great job!';
  } else if (scr >= 200){
    clr = 'blue';
    msg = "Github Elite"
  }

  return (
    <div className="row">
      <h3 style={{color: clr}}>{msg}</h3>
    </div>
  )

}

export default App;
