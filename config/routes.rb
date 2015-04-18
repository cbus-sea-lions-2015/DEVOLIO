Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]
  
  get 'run_api', to: 'api#run'

  post 'store_github', to: 'api#github'

  root to: 'static#index'
end
