import axios from 'axios';

const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export async function searchSpotify(token, songName) {
  let result = await spotify.get(`/search?q=${songName}&type=track`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
//   console.log(result)
  return result.data
}
