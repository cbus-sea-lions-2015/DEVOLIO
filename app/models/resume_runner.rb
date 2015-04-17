class ResumeRunner
  def initialize(user)
    @tweets = twitter(user)
  end

  def twitter(user)
    tp = TweetParser.new(user)
    tp.parse
  end
end