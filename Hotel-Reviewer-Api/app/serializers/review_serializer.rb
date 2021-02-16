class ReviewSerializer < ActiveModel::Serializer 
  attributes :rating, :review_text
  belongs_to :user 
  belongs_to :hotel
end
