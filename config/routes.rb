Tb::Application.routes.draw do
  root :to => 'homes#index'
  resources :blogs, :homes
  get 'homes/admin'
end
