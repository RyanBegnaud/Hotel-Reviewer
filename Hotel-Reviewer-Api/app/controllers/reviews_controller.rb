class ReviewsController < ApplicationController
    def index
        reviews = Review.all 
        render json: reviews 
    end

    def create
        if params[:user_id] == nil 
            error = "Must be signed in to leave a review"
            render json: error
        else 
            binding.pry 
            review = Review.create(review_params)
            hotel = Hotel.find_by(id: params[:hotel_id])
            render json: review 
        end
    end

    private 

    def review_params
        params.require(:review).permit(:hotel_id, :user_id, :rating)
    end
        
end
