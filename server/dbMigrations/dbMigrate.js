const songs = require('./rockWithThisSongs.json');
const { Pool } = require('pg');
const format = require('pg-format');

const DB_USER = 'root';
const DB_HOST = 'rockwiththis.cnd9e0a3mccm.us-east-2.rds.amazonaws.com';
const DB_DATABASE = 'rockwiththis_prod';
const DB_PASSWORD = 'RWT1234!';
const DB_PORT = 5432;

if (
  !DB_USER ||
  !DB_HOST ||
  !DB_DATABASE ||
  !DB_PASSWORD ||
  !DB_PORT
) {
  throw new Error('Missing required DB env vars');
}

const database = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

songs.forEach((song, index) => {
  console.log('Pushing song', index);
  console.log(song.better_featured_image);
  const values = [
    song.acf.song_name,
    song.content.rendered,
    (song.better_featured_image) ? song.better_featured_image.source_url : null,
    2,
    song.acf.artist_name,
    song.acf.spotify_link,
    song.acf.soundcloud_link,
    song.acf.sc_track_id,
    song.acf.youtube_link,
    song.acf.youtube_track_id,
    song.acf.bpm,
    song.acf.location,
    song.date,
    song.tags
  ];
  const query = format('INSERT INTO songs (name, description, image_url, curator_id, artist_name, spotify_link, soundcloud_link, soundcloud_track_id, youtube_link, youtube_track_id, bpm, artist_location, created_at, subgenres) VALUES (%L) returning *', values);

  database.query(query)
    .then(() => console.log('BITCH WE DONE!', index));
});
