var firebase = require('firebase')
var Twitter = require('twitter')


try {
  var config = {
      apiKey: "AIzaSyAszawFKGNUFg5-OTrxh5hGw9YkEOZuVA8",
      authDomain: "vibehive-9a55c.firebaseapp.com",
      databaseURL: "https://vibehive-9a55c.firebaseio.com",
      projectId: "vibehive-9a55c",
      storageBucket: "vibehive-9a55c.appspot.com",
      messagingSenderId: "159539366706"
    };
  firebase.initializeApp(config);
} catch (e) {
  console.log(e)
}


var client = new Twitter({
  consumer_key: '2K0ks6ujoGoJvHgGl3BWOD5yX',
  consumer_secret: 'pcIYTYs7I9EX1TYF69fzxkDVXxWRFjTgggUmcgCt707CubwAcp',
  access_token_key: '4767500142-oCfQ5UclB84V1AJsPfDBahaTKhFPyUqal1B5zWq',
  access_token_secret: 'pUZUyR3guiWej9r7MRhxCtoUQqcvpK0bkfKmQzwu3weUi'
});

client.stream('statuses/filter', {track: '#aashrine'},  function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
    //make new tweet key
    var newTweetKey = firebase.database().ref().child('tweets').push().key;
    //push new tweet
    var updates =  {};

    updates[`/tweets/${newTweetKey}`] = tweet.text;
    return firebase.database().ref().update(updates);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
