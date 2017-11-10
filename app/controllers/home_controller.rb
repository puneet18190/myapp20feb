class HomeController < ApplicationController
  def index

  end

  def buy

  end

  def refinance

  end

  def video_gallery
    @videos = Video.all
  end
end