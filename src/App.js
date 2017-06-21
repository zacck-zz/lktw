import React, { Component } from 'react';
import './App.css';

var Twitter = require('twitter')



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }
  componentDidMount() {
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    client.stream('statuses/filter', {track: '#aashrine'},  function(stream) {
      stream.on('data', function(tweet) {
        this.setState({
          tweets: [
            ...this.state.tweets,
            tweet.text
          ]
        })
      });

      stream.on('error', function(error) {
        console.log(error);
      });
    });

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
