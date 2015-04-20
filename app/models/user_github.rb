class UserGithub
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  field :pushEvents
  field :pullEvents
  field :gistEvents
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
  field :blog_link

  belongs_to :user
end