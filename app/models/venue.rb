class Venue
  include Mongoid::Document
  field :foursquare_api_id, String

  embedded_in :deal
end
