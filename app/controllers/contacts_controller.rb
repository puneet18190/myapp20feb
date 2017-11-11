class ContactsController < ApplicationController

  def new
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(params[:contacts])
    @contact.request = request
    if @contact.deliver
      flash[:error] = nil
    else

      flash[:error] = 'Cannot send message'
      render :new

    end
  end
end
