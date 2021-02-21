Rails.application.routes.draw do
  resources :users
  resources :reviews
  resources :hotels
  get '/sign-up', to: "sessions#new"
 
end
