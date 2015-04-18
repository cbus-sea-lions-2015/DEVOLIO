class RegistrationsController < Devise::RegistrationsController
  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :twitter_handle, :name, :description, :interests, :skills)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :twitter_handle)
  end
end