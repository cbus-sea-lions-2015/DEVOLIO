class ApiController < ApplicationController
  def run
    ApiRunner.new("hi")
    redirect_to root_path
  end
end