class ResumesController < ApplicationController
  def twitter
    user = User.find_by(username: params[:username])
    tweets = user.user_tweet.tweets

    tweets.map {|t| t.to_json} #should return an array
  end

  def github
    github_data = User.find_by(user_name: params[:username]).github_profile

    github_data.to_json
  end

  def email
    email = UserMailer.share_email(params).deliver_now
    date = DateTime.now.strftime("%Y-%m-%d")
    
    render json: {email: params[:email], date: date }
  end

  def email_history
    @email_history = User.find_by(username: params[:username]).email_histories.map {|e| e.recipient}
    respond_to do |wants|
      wants.js do
        render json: {history: @email_history}
      end
    end
  end
end