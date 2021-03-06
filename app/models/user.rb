class User
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ## Database authenticatable
  field :username,           type: String
  field :email,              type: String
  field :encrypted_password, type: String

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String
  field :name,               type: String
  field :github_handle,      type: String
  field :twitter_handle,     type: String
  field :linkedin_handle,    type: String
  field :description,        type: String
  field :interests
  field :website,            type: String
  field :RSS_feed,           type: String
  field :skills

  field :avatar,             type: String
  field :positions

  field :loc_local
  field :loc_relocate
  field :loc_remote

  field :project_link,        type: String
  field :project_name,        type: String
  field :project_description, type: String
  field :project_pic_link,    type: String

  has_one :github_info
  has_one :user_tweet
  has_many :email_histories

  validates_uniqueness_of :username, :email
  validates_format_of :username, with: /\w+/


  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time
end
