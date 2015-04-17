class UserTweet
  include Mongoid::Document
  field :user_name, type: String
  field :tweets
end