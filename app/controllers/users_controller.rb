class UserController < ApplicationController
  def show
    @user = User.find_by(username: params[:username])
  end

  def edit 
    @user = current_user
  end

  def update

  end
end