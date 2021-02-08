class HotelSerializer < ActiveModel::Serializer 
  attributes :name, :island, :address, :imgs, :number, :id
  has_many :reviews
  has_many :users, through: :reviews
end
