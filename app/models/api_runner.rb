class ApiRunner
  def initialize(user)
    twitter(user)
  end

  def twitter(user)
    twitter = TwitterAPI.new(user["twitter_handle"])
    tweets = twitter.search(user["twitter_includes"])
    t = UserTweet.new(user_name: user["username"], tweets: tweets)
    if t.save 
      puts "saved!"
    else
      puts "not saved!"
    end
  end

  # def twitter(user)
  #   twitter = TwitterAPI.new("tremulaes")
  #   p tweets = twitter.search(["I", "go", "morning"]).take(5)
  #   t = UserTweet.new(user_name: "tremulaes", tweets: tweets)
  #   if t.save 
  #     puts "saved!"
  #   else
  #     puts "not saved!"
  #   end
  # end  

end