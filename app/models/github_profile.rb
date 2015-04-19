class GithubProfile 
  include Mongoid::Document

  field :pushEvents
  field :pullEvents
  field :gitsEvents
  field :forkEvents
  field :mostRecentEventDate
  field :oldestEventDate
  field :commits
  field :lineAdditions
  field :lineDeletions
  field :commitMessages
  field :languages
  field :username
  field :fullName
  field :aviurl
  field :profileurl
  field :location
  field :followersnum
  field :followingnum
  field :reposnum

  belongs_to :user
end