Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]

  get '/:username', to: 'users#show'
  get '/dashboard', to: 'users#edit'

  get 'run_api', to: 'api#run'

  post 'store_github', to: 'api#github'

  root to: 'static#index'
end
