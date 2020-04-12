Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data

    get '/data', to: 'tests#index'

    post '/recipe' => 'recipes#create'
    resources :recipes do
      resources :user_recipes, only: [:create, :update, :destroy]
      resources :nutrients, only: [:create, :update, :destroy]
    end

    post '/login' => 'sessions#create'
    get '/logout' => 'sessions#destroy'
    
    post '/users' => 'users#create'

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end

