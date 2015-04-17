class UsersController < ApplicationController
  def show
    @user = current_user
  end

  def edit 
    @user = current_user
  end

  def update
      @user = current_user
    if @user.update(user_params)
      redirect_to @user
    else
      render 'Edit'
    end
  end
  private

  def user_params
    params.require(:user).permit(:name, :email, :twitter_handle, :description, :interests, :skills)
  end
end

 
