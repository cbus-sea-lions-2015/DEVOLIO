class EmailHistory
  include Mongoid::Document

  belongs_to :user

  field :recipient, type: String
  field :date,  type: Date
end