import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./credentials";

const fetchAccessToken = async () => {
  try {
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

    if (!response.ok) {
      throw new Error(`Error Status: ${response.status}`);
    }

    const data = await response.json();
    const token = data.access_token;
    console.log('Client Access Token:', token);

    return token;
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    return null;
  }
}

export default fetchAccessToken;