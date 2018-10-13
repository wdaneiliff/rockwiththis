const songs = require('./rockWithThisSongs.json');
var AWS = require('aws-sdk');


// var credentials = new AWS.SharedIniFileCredentials();
// AWS.config.credentials = credentials;


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-2'});

// Create the DynamoDB service object
ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});



songs.forEach((song, index) => {
  console.log(song.tags)
  var params = {
    TableName: 'Songs',
    Item: {
      'song_id' : {S: song.id.toString()},
      'name' : {S: song.acf.song_name},
      'description' : {S: song.content.rendered},
      'subgenres' : {L: Array.from(song.tags)}

    }
  };
  ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

//
//   console.log('Pushing song', index);
//   console.log(song.better_featured_image);
//   const values = [
//     song.id,
//     song.acf.song_name,
//     song.content.rendered,
//     (song.better_featured_image) ? song.better_featured_image.source_url : null,
//     song._embedded.author.id,
//     song.acf.artist_name,
//     song.acf.spotify_link,
//     song.acf.soundcloud_link,
//     song.acf.sc_track_id,
//     song.acf.youtube_link,
//     song.acf.youtube_track_id,
//     song.acf.bpm,
//     song.acf.location,
//     song.date,
//     song.tags
//   ];
//   const query = format('INSERT INTO songs (song_id, name, description, image_url, curator_id, artist_name, spotify_link, soundcloud_link, soundcloud_track_id, youtube_link, youtube_track_id, bpm, artist_location, created_at, subgenres) VALUES (%L) returning *', values);
//
//   database.query(query)
//     .then(() => console.log('BITCH WE DONE!', index));
});
