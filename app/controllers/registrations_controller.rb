class RegistrationsController < Devise::RegistrationsController
  private

  def sign_up_params
    
    params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :description, :interests, :skills, :twitter_handle, :github_handle, :blog_link )
  end

   def after_sign_up_path_for(resource)
    '/dashboard'
  end
end