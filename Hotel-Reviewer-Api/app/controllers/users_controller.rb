class UsersController < ApplicationController
    
    def new
        user = User.new 
    end

    def create 
        user = User.find_by(username: params[:username]) 
        binding.pry 
        if user && user.authenticate(params[:password])
            render json: user 
        else 
            flash[:notice] = "No user found with those credentials"
            render 'new'
        end
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
