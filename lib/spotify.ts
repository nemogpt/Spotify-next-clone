import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-follow-read",
  "user-library-read",
  "streaming",
  "user-read-recently-played",
  "user-top-read",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private"
].join(',');

const params = {
  scope: scopes,
};

const queryString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyAPI;

export { LOGIN_URL };
