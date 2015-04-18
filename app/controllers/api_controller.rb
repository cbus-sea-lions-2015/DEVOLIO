class ApiController < ApplicationController
  def run
    ApiRunner.new(current_user)
    redirect_to root_path
  end
end