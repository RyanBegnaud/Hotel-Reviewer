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
            user.password = params[:password]
            user.save
            render json: user
        end
    end

    def sign_in
        user = User.find_by(username: params[:username])

        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else 
            error = {error: "No user found with that Username or Password is incorrect"}
            render json: error
        end
    end

    def destroy
       session[:user_id].clear 
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
