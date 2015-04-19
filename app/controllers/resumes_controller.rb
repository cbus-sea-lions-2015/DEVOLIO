class ResumesController < ApplicationController
  def twitter
    tweet_collection = UserTweet.find_by(user_name: params[:username])

    tweet_collection.tweets.map {|t| t.to_json} #should return an array
  end

  def github
    github_data = User.find_by(user_name: params[:username]).github_profile

    github_data.to_json
  end
end