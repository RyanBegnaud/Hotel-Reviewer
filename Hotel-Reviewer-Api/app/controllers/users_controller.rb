class UsersController < ApplicationController
    
    def new
        user = User.new 
    end

    def create 
        user1 = User.find_by(username: params[:username])
        if user1 
            error = {error: "User already exsists with that username please try again!"}
            render json: error 
        elsif params[:password] == ""
            error = {error: "Password is required"}
            render json: error
        else 
            user = User.create(user_params)
            render json: user
        end
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
