class ApiRunner
  def initialize(current_user)
    twitter(current_user)
  end

  def twitter(current_user)
    twitter = TwitterAPI.new(current_user["twitter_handle"])
    tweets = twitter.search(current_user["twitter_includes"] || [])
    t = UserTweet.new(user_name: current_user["email"], tweets: tweets)
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