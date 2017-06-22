import React, { Component } from 'react';
import './App.css';
import firebase, {firebaseRef} from './firebase.js'

var Twitter = require('twitter')



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }
  componentDidMount() {
    var tweetsRef = firebaseRef.child(`tweets`);

    tweetsRef.on('child_added', (data) => {
      this.setState({
        tweets: [
          ...this.state.tweets,
          data.val()
        ]
      })
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
      </div>
    );
  }
}

export default App;
