class APIRUnner
  def initialize(user)
    @user = user
  end

  def twitter
    twitter = TwitterAPI.new(user["twitter_handle"])
    tweets = twitter.search(user["twitter_includes"])
    t = UserTweet.new(user_name: @user["username"], tweets: tweets)
    t.save
  end

end