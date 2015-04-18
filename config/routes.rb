Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]
  
  get '/:username', to: 'user#show'
  get 'run_api', to: 'api#run'

  

  root to: 'static#index'
end
