class StaticController < ApplicationController

  def index
    puts "redirect!"
    redirect_to "/#{current_user.username}" if signed_in?
  end

  def blank
    
  end
end