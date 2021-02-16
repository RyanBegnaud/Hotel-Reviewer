class Hotel < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    def average_rating 
        binding.pry 
    end
end
