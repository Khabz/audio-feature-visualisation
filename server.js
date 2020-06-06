const express = require("express");
const app = express();
const cors = require("cors")
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const path = require("path");
app.use(cors());

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

app.get("/search", function(request, response) {
    spotifyApi.searchTracks(request.query.term, { limit: 8 })
        .then(function(data) {
            response.send(data.body);
        }, function(err) {
            console.log(err)
        });
});

app.get("/features", function(request, response) {
    spotifyApi.getAudioFeaturesForTrack(request.query.id)
        .then(function(data) {
            response.send(data.body);
        }, function(err) {
            console.log(err)
        });
});

spotifyApi.clientCredentialsGrant()
    .then(function(data) {
        console.log('Access Token Will Expire In', data.body['expires_in']);

        // Save the access token for future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.log('Error while retrieving access token', err.message);
    });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));