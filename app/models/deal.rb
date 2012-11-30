class Deal
  include Mongoid::Document
  field :name, type: String, default: ""
  field :date, type: Time
  field :start_time, type: Time, default: ""
  field :end_time, type: Time, default: ""
  field :recurring, type: Boolean

  #validation
  attr_accessible :name, :date, :start_time, :end_time, :recurring
  validates_presence_of :name, :date, :start_time, :end_time

  # relationships
  belongs_to :user
  belongs_to :venue
end
