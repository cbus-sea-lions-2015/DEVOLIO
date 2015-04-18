class UserController < ApplicationController
  def show
    @user = User.find_by(username: params[:username]).to_json
  end

  def edit
    @user = current_user
  end

  def update

  end
end