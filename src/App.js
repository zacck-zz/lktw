import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    const elem = ReactDOM.findDOMNode(this.refs.scrollBox);
    var tweetsRef = firebaseRef.child(`tweets`);

    tweetsRef.on('child_added', (data) => {
      this.setState({
        tweets:  [
          this.state.tweets,
          data.val() + ' '
        ]
      });
      elem.scrollIntoView();
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
        <div
          className="twtlst"
          ref="scrollBox"
          >
          <p className="req">Tweet Your Tribute @AfrikanerApokolips Shrine #AAShrine </p>
        </div>
      </div>
    );
  }
}

export default App;
