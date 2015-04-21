class EmailHistory
  include Mongoid::Document

  belongs_to :user

  field :recipient, type: String
end