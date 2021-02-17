class ReviewSerializer < ActiveModel::Serializer 
  attributes :rating, :review_text, :user
  belongs_to :user 
  belongs_to :hotel
end
