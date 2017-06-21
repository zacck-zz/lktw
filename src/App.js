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
      consumer_key: '2K0ks6ujoGoJvHgGl3BWOD5yX',
      consumer_secret: 'pcIYTYs7I9EX1TYF69fzxkDVXxWRFjTgggUmcgCt707CubwAcp',
      access_token_key: '4767500142-oCfQ5UclB84V1AJsPfDBahaTKhFPyUqal1B5zWq',
      access_token_secret: 'pUZUyR3guiWej9r7MRhxCtoUQqcvpK0bkfKmQzwu3weUi'
    });

    client.stream('statuses/filter', {track: '#aashrine'},  function(stream) {
      stream.on('data', function(tweet) {
        console.log(tweet.text);
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
