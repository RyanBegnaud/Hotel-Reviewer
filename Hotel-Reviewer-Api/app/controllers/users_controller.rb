class UsersController < ApplicationController
    
    def new
        user = User.new 
    end

    def create 
        user = User.find_or_create_by(user_params)
        session[:user_id] = user.id
        render json: user
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
