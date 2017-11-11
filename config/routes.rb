Rails.application.routes.draw do
  get 'contacts/new'

  get 'contacts/create'

  devise_for :users, :controllers => { registrations: 'registrations' }

  resources :videos


  root to: 'home#index'

  get '/contact' => 'contact#index'

  get '/team' => 'team#index'

  get '/buy' => 'home#buy'
  get '/refinance' => 'home#refinance'

  get '/admin' => 'admin#index'

  get '/video_gallery' => 'home#video_gallery'

  get '/application_process' => 'home#application_process'

  get '/about' => 'home#about'


  resources 'contacts', only: [:new, :create], path_names: { new: '' }
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end


end
