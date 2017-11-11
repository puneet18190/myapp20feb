class AdminController < ApplicationController
  def index
    if current_user

    else
      redirect_to '/users/sign_up'
    end
  end
end