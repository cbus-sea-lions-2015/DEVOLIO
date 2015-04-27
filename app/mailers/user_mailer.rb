class UserMailer < ApplicationMailer
  default from: 'no-reply@devol.io'

  def share_email(params)
    @user = User.find_by(username: params[:username])
    @message = params[:message]
    @url = "https://devolio.herokuapp.com/#{@user.username}"
    mail(to: params[:email], subject: "#{@user.name} would like to share their Devolio!")
    @user.email_histories.create(recipient: params[:email], date: DateTime.now)
  end

end
