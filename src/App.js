import React, { Component } from 'react';
import './App.css';
import firebase, {firebaseRef} from './firebase.js'

var Twitter = require('twitter')



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      scrollTop: 0,
    };
    this.focus = this.focus.bind(this);
  }
  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }
  componentDidMount() {
    var tweetsRef = firebaseRef.child(`tweets`);

    tweetsRef.on('child_added', (data) => {
      this.setState({
        tweets:  [
          this.state.tweets,
          data.val()
        ]
      });
      window.scrollTo(0, 0);
    })
  }
  render() {
    var tweets =  this.state.tweets;
    var renderTweets = () => {
      if(tweets.length == 0) {
        return(
          <p> No One Has Tweeted Us</p>
        );
      }
      return tweets.map((t) => {
        return(
          <div>
            <p>{t}</p>
          </div>
        )
      })
    }
    return (
      <div className="App">
        {renderTweets()}
        <div className="twtlst">
          <input
          type="hidden"
          ref={(input) => { this.textInput = input; }} />
        </div>
      </div>
    );
  }
}

export default App;
