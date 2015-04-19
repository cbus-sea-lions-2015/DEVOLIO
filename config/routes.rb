Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]

  # get '/:username', to: 'users#show'
  # get '/dashboard', to: 'users#edit'

  get 'run_api', to: 'api#run'
  get 'resumes/twitter/:username', to: 'resumes#twitter'
  get 'resumes/github/:username', to: 'resumes#twitter'

  post 'store_github', to: 'api#github'

  root to: 'static#index'

  get '*parts', to: 'static#index'
end
