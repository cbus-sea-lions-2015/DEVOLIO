class UsersController < ApplicationController
  # respond_to :html,:json

  def index

  end

  def show
    @user = User.find_by(username: params[:id])
    tweets = TweetParser.new(@user).tweets
    @user_all = { user_settings: @user,
                  user_github: @user.github_info,
                  user_tweets: tweets,
                  emailHistory: @user.email_histories,
                  location_pref: calc_location_pref(@user) }
    respond_to do |wants|
      wants.js { render json: @user_all }
      wants.html
    end
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
    @user.skills = params[:user][:skills]
    @user.positions = params[:user][:positions]
    @user.loc_local = (params[:user][:loc_local] ? true : false)
    @user.loc_remote = (params[:user][:loc_remote] ? true : false)
    @user.loc_relocate = (params[:user][:loc_relocate] ? true : false)
    saved = @user.update(user_params)
    run_twitter_api(current_user) if saved
    respond_to do |wants|
      wants.js do
        if saved
          render json: @user
        else
          render json: @user, status: 422
        end
      end
      wants.html do
        if saved
          redirect_to @user
        else
          render 'Edit'
        end
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :name, :email, :avatar, :twitter_handle, :description, :interests, :github_handle, :linkedin_handle, :website, :loc_local, :loc_remote, :loc_relocate)
  end

  def run_twitter_api(user)
    user.user_tweet.destroy if user.user_tweet
    twitter = TwitterAPI.new(user["twitter_handle"])
    tweets = twitter.search(user["twitter_includes"] || [])
    current_user.user_tweet = UserTweet.new(user_name: current_user["email"], tweets: tweets)
  end

  def calc_location_pref(user)
    if user.loc_local && user.loc_remote && user.loc_relocate
      "work locally, remotely, or relocate"
    elsif user.loc_local && user.loc_remote
      "work locally or remotely"
    elsif user.loc_local && user.relocate
      "work locally or relocate"
    elsif user.loc_remote && user.loc_relocate
      "work remotely or relocate"
    elsif user.loc_local
      "work locally"
    elsif user.loc_remote
      "work remotely"
    elsif user.loc_relocate
      "relocate for work"
    end
  end
end
