class ResumeRunner
  attr_accessor :tweets
  def initialize(current_user)
    @tweets = twitter(current_user)
  end

  def twitter(current_user)
    tp = TweetParser.new(current_user)
    tp.parse
  end
end