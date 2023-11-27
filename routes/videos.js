const express = require("express");
const fs = require("fs");
const { parse } = require("path");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const videosJson = fs.readFileSync('./data/videos.json');

const parsedVideos = JSON.parse(videosJson);

router.get('/', (req, res) => {
    res.json(parsedVideos);
})

router.get('/:videoId', (req, res) => {
    const videoId = req.params.videoId;

    const individualVideo = parsedVideos.find((video) => {
        return video.id === videoId;
    })

    console.log(individualVideo);
    console.log(parsedVideos);

    if(!individualVideo){
        res.status(404).send("Video not found");
    }

    res.json(individualVideo);
})

const readVideos = () => {
    const videosFile = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosFile);
    return videos;
  };


const writeVideos = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync("./data/videos.json", stringifiedData);
  
  };


router.post('/', (req, res) => {

    console.log(req.body);

    const videos = readVideos();

    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        timestamp: new Date(),
        description: req.body.description,
        views: 0,
        likes: 0,
        comments: [],
        channel: req.body.channel,
        image: 'images/Upload-video-preview.jpg'
      };

    videos.push(newVideo);

    writeVideos(videos);

    res.json(newVideo);

    res.json('success');
    
})

module.exports = router;