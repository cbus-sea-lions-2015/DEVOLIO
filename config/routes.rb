Rails.application.routes.draw do

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]

  post 'store_github', to: 'api#github'
  post 'email', to: 'resumes#email'

  get '/:username', to: 'static#blank'
  get 'dashboard', to: 'static#blank'

  root to: 'static#index'

  get '*parts', to: 'static#index'
end
