# To call for the twitter API, we need to feed it user name a a list of the user
# include words.
#
# includes = ["code"]
#
# a = TwitterAPI.new("tremulaes")
# a.search(includes).each {|tweet| puts tweet["text"] }

class TwitterAPI
  def initialize(user)
    @user = user
    @client = make_client
  end

  def make_client
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "VQDkvxTRV4CaBunLTIGggXuiD"
      config.consumer_secret     = "MMPUpVsfwwL1N5usGfUgMxyLJfkmJafMpWQAXcKc33RpcEF1hu"
      config.access_token        = "254904474-rzHmI4hEn0Yo6wPRhqr8xU1fsatNed39OQagjRmg"
      config.access_token_secret = "Y6XbTOvE4SlimFcQTZ5N95CaNuN1cvv0hGUW82AN4gkJK"
    end
    client
  end

  def search#(includes) #expect an array of strings
    results = []
    @client.search(query, result_type: "recent", count: 100).each do |tweet|
      results << JSON.parse(tweet.to_h.to_json)
    end
    results
  end

  def query#(includes)
    result = "from:#{@user}"
    # includes.each_with_index do |term, i|
    #   if i == 0
    #     result += " #{term}"
    #   else
    #     result += " OR #{term}"
    #   end
    # end

    puts "query string: #{result}"
    result
  end
end