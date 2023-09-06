import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
var clientId = process.env.SPOTIFY_CLIENT_ID
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET

class SpotifyService {
  // public static async fetchTrackMetadata(): Promise<any> {
  //   const accessToken = await this.getAccessToken();
  //   const response = await axios.get(
  //   `https://api.spotify.com/v1/search?q=thetitle&type=track`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     } 
  //   );
  //   const isrc = response.data.tracks.items[0].external_ids.isrc;
  //   const trackRes = await this.fetchTrackByISRC(isrc);

  //   return trackRes;
  // }

  private static async getAccessToken(): Promise<string> {
    const response = await axios.post<any>(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data.access_token;
  }

  public static async fetchTrackByISRC(isrc: string, skip: number, limit: number): Promise<any> {
    const accessToken = await this.getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?query=isrc:${isrc}&type=track&offset=${skip}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      } 
    );
    const itemWithHighestPopularity = await this.findItemWithHighestPopularity(response.data.tracks.items);
    return itemWithHighestPopularity;
  }

  private static async findItemWithHighestPopularity(data: any[]): Promise<any> {
    if (data.length === 0) {
      return null; // No items in the data
    }
  
    let highestPopularityItem = data[0];
  
    for (const item of data) {
      if (item.popularity > highestPopularityItem.popularity) {
        highestPopularityItem = item;
      }
    }
  
    return highestPopularityItem;
  }
}

export default SpotifyService;