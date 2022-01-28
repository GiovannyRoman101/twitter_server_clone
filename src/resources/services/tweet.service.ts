import Tweet from '../../entities/Tweet'

class TweetService {
	public async getAllTweets() {
		Tweet.find()
	}

	public async createTweet(id: number, message: string): Promise<Tweet> {
		try {
			const tweet = new Tweet()
			tweet.id = id
			tweet.message = message
			tweet.save()
			return tweet
		} catch (error) {
			throw new Error('Unable to create Tweet')
		}
	}
}

export default TweetService
