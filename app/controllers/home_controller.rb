class HomeController < ApplicationController
  def index
    @contact = Contact.new
  end

  def buy

  end

  def refinance

  end

  def video_gallery
    @videos = Video.all
  end

  def application_process
    @contact = Contact.new

  end

  def about

  end


  def new
  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash.now[:error] = nil
      flash.now[:notice] = 'Thank you for your message!'
    else
      flash.now[:error] = 'Cannot send message.'
      render :new
    end
  end
end