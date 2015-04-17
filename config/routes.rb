Rails.application.routes.draw do
<<<<<<< HEAD
  devise_for :users
  get 'run_api', to: 'api#run'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
=======
>>>>>>> master

  devise_for :users, :controllers => { registrations: 'registrations' }
  resources :users, only: [:show, :edit, :update, :destroy]

  root to: 'static#index'
end
