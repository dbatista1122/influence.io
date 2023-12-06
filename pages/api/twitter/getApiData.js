import { TwitterApi } from 'twitter-api-v2';

export async function getApiData(access_token) {
  try {
    console.log(access_token);
    const twitterBearer = new TwitterApi(access_token);
    const user = await twitterBearer.v2.usersByUsernames(['Onoh_9'], {
        expansions: 'pinned_tweet_id',
        'user.fields': 'public_metrics',
        'tweet.fields': 'created_at',
      });
      console.log(user)
      const tweet = user.data[0].pinned_tweet_id;
      console.log(tweet);
      const tweetMetrics = await twitterBearer.v2.singleTweet([tweet], {
        expansions: ['attachments.media_keys'],
        'tweet.fields': 'public_metrics'
      })
      console.log(tweetMetrics);
      /*
      const responseData = {
        retweet_count: tweetMetrics.data[0].public_metrics.retweet_count,
        reply_count: tweetMetrics.data[0].public_metrics.reply_count,
        like_count: tweetMetrics.data[0].public_metrics.like_count,
        impression_count: tweetMetrics.data[0].public_metrics.impression_count,
        // Add other relevant data as needed
      };
      return responseData;
      */
     return {user, tweetMetrics};
  } catch (error) {
    // Handle errors
    console.error('Error in Twitter API call:', error);
  }

}
/*
export default async function handler(req, res) {
    // Your existing code for the API route
    try {
      const access_token = req.body.accessToken;
      const result = await getApiData(access_token);
      res.json(result);
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
*/