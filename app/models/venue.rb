class Venue
  include Mongoid::Document
  # field :foursquare_api_id, String
  field :name
  field :street_address
  field :city
  field :state
  field :country
  field :mail_code #this seems like a nice compromise on the zip/postal code thing
  field :lat
  field :long




  has_many :deals
end
