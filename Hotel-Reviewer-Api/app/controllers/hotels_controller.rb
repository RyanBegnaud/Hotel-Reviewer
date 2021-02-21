class HotelsController < ApplicationController
    def index 
        hotels = Hotel.all 
        render json: hotels
    end

    def show 
        hotel = Hotel.find_by(id: params[:id])
        render json: hotel
    end
end
