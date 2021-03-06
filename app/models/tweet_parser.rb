class TweetParser
  attr_reader :tweets

  def initialize(user)
    @tweets = (user.user_tweet ? user.user_tweet.tweets : nil)
  end

  def parse
    results = []
    @tweets.each do |tweet|
      results << {
        display_name: tweet["user"]["name"],
        user_name: tweet["user"]["screen_name"],
        avatar: tweet["user"]["profile_image_url"],
        body: tweet["text"],
        created_at: tweet["created_at"],
        retweets: tweet["retweet_count"],
        favorites: tweet["favorite_count"]
      }.to_json
    end
    results
  end
end