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
    return {user, tweetMetrics};
  } catch (error) {
    // Handle errors
    console.error('Error in Twitter API call:', error);
  }

}