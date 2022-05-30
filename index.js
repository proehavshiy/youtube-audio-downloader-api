const fs = require('fs');
const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());


function getAudio(videoURL, res) {
  const stream = ytdl(videoURL, {
    quality: "highestaudio",
    filter: "audioonly",
  }).pipe(res)

};

function getAudioInfo(videoURL, res) {
  // https://img.youtube.com/vi/0ia3ZLgVEE0/maxresdefault.jpg
  ytdl.getBasicInfo(videoURL)
    .then((info) => {
      const { videoDetails: {
        videoId,
        title,
        lengthSeconds,
        ownerChannelName,
        ownerProfileUrl,
        media
      },
        related_videos
      } = info;

      const trackData = {
        preview: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        title,
        lengthSeconds,
        ownerChannelName,
        ownerProfileUrl,
        // media,
        // related_videos
      }
      res.send(trackData)
    })
}

app.get("/", (req, res) => {
  const { ytUrl } = req.query;
  getAudio(ytUrl, res)
});

app.get("/info", (req, res) => {
  const { ytUrl } = req.query;
  getAudioInfo(ytUrl, res)
});

// const info = ytdl('https://www.youtube.com/watch?v=0ia3ZLgVEE0')
//   .pipe(fs.createWriteStream('video.mp4'));



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});