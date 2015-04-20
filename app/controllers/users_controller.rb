class UsersController < ApplicationController
  # respond_to :html,:json

  def index

  end

  def show
    @user = User.find_by(username: params[:id])
    puts @user.inspect
    puts @user.github_info.inspect
    @user_all = {user_settings: @user, user_github: @user.github_info }
    puts @user_all.inspect
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
    saved = @user.update(user_params)
    puts @user.github_info
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
    params.require(:user).permit(:username, :name, :email, :twitter_handle, :description, :interests, :skills, :github_handle)
  end
end


