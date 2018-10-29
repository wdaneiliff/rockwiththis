const express = require('express');
const router = express.Router();
const database = require('../../db');

const nestResultingSongsWIthGenres = (songs) => {
  let result = [];
  let first = { genre_id, genre_name, ...initialSong } = songs[0];
  let currentSong = initialSong;
  
  for (let i = 0; i < songs.length; i++) {
    if (currentSong.id != songs[i].id) {
      result.push(currentSong)
      const clone = { genre_id, genre_name, ...cloned_song } = songs[i];
      currentSong = cloned_song;
    }

    const genre = {
      id: songs[i].genre_id,
      name: songs[i].genre_name
    };

    if (!currentSong.sub_genres) {
      currentSong.sub_genres = [genre];
    } else {
      currentSong.sub_genres.push(genre);
    }
  }

  return result;
}

router.get('/', (req, res) => {
  database.query(`
    SELECT subgenres.id as genre_id, subgenres.name as genre_name, songs.*
    FROM songs
    JOIN subgenre_songs
    ON songs.id = subgenre_songs.song_id
    JOIN subgenres
    ON subgenres.id = subgenre_songs.subgenre_id
    ORDER by songs.id`
  )
  .then(result => {
    console.log(result.rows);
    const songsWithSubGenres = nestResultingSongsWIthGenres(result.rows);
    res.json(songsWithSubGenres);
  });
});

module.exports = router;
