class UserMailer < ApplicationMailer
  default from: 'no-reply@devol.io'

  def share_email(params)
    @user = User.find_by(username: params[:username])
    @url = "https://devolio.herokuapp.com/#{@user.username}"
    mail(to: params[:email], subject: "#{@user.name} would like to share their Devolio!")
  end

end
