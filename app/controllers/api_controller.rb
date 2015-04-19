class ApiController < ApplicationController
  def run
    ApiRunner.new(current_user)
    redirect_to root_path
  end

  def github
    current_user.github_profile.update_attributes(github_params)
    redirect_to root_path
  end

  private 
  def github_params
    params.require(:github_profile).permit(:pushEvents, :pullEvents, :gitsEvents, :forkEvents, :mostRecentEventDate, :oldestEventDate, :commits, :lineAdditions, :lineDeletions, :commitMessages, :languages, :username, :fullName, :aviurl, :profileurl, :location, :followersnum, :followingnum, :reposnum)
  end
end