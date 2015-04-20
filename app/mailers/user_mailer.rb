class UserMailer < ApplicationMailer
  default from: 'no-reply@devol.io'

  def share_email(address)
    @user = current_user
    @url = "https://devolio.herokuapp.com/#{@user.username}"
    mail(to: address, subject: "#{@user.name} would like to share their Devolio!")
  end

end
