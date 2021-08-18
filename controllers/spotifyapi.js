const express = require("express");
const request = require("request");
const Cookies = require("js-cookie");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();
// const db = require("./db");

const client_id = process.env.CLIENT_ID;
console.log(client_id);
const client_secret = process.env.SECRET_ID;
const redirect_uri = process.env.REDIRECT_URI;
const stateKey = "spotify_auth_state";
const acc_refresh_token = process.env.REFRESH_TOKEN;

var spotifyapi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

spotifyapi.setRefreshToken(acc_refresh_token);

spotifyapi.refreshAccessToken().then(
  function (data) {
    console.log("The access token has been refreshed!");

    // Save the access token so that it's used in future calls
    spotifyapi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log("Could not refresh access token", err);
  }
);

const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const login = (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "playlist-modify-public",
  ];

  var authorizeURL = spotifyapi.createAuthorizeURL(scopes, state);

  res.redirect(authorizeURL);
};
module.exports.login = login;

const callback = (req, res) => {
  var code = req.query.code || null;

  spotifyapi.authorizationCodeGrant(code).then(
    function (data) {
      console.log("The token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);
      console.log("The refresh token is " + data.body["refresh_token"]);

      // Set the access token on the API object to use it in later calls
      spotifyapi.setAccessToken(data.body["access_token"]);
      spotifyapi.setRefreshToken(data.body["refresh_token"]);

      //Cookie Store

      const unique_id = generateRandomString(16);

      Cookies.set("unique_id", unique_id);

      //Database Update / Create User

      res.redirect("/success");
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};
module.exports.callback = callback;

const refresh_token = (req, res) => {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
};
module.exports.refresh_token = refresh_token;

const recommend = (req, res) => {
  const recommendation_params = req.body.recommendation_params;
  console.log(recommendation_params);

  spotifyapi.getRecommendations(recommendation_params).then(
    function (data) {
      let recommendations = data.body;
      console.log(recommendations);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
};

module.exports.recommend = recommend;
