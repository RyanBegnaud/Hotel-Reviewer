class Hotel < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    def average_rating 
        ratings = 0 
        self.reviews.each do |review| 
            ratings += review.rating
        end
        
        if self.reviews.empty?
            return "No reviews yet"
        else 
            return ratings / self.reviews.length
        end
    end
end
