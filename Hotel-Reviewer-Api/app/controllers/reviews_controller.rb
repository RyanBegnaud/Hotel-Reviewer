class ReviewsController < ApplicationController
    def index
        reviews = Review.all 
        render json: reviews 
    end

    def create
        if params[:user_id] == nil 
            error = "Must be signed in to leave a review"
            render json: error
        elsif params[:review_text] == nil
            review = Review.create(review_params)
            render json: review 
        else 
            review = Review.create(review_params) 
            review.review_text = params[:review_text]
            review.save 
            render json: review 

        end
    end

    def show 
        review = Review.find_by(id: params[:id])
        render json: review
    end

    private 

    def review_params
        params.require(:review).permit(:hotel_id, :user_id, :rating)
    end
        
end
