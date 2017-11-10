Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :videos


  root to: 'home#index'

  get '/contact' => 'contact#index'

  get '/team' => 'team#index'

  get '/buy' => 'home#buy'
  get '/refinance' => 'home#refinance'

  get '/admin' => 'admin#index'

  get '/video_gallery' => 'home#video_gallery'

end
