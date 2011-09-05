class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :blog
  helper :all
  
  private
  
  def blog
    @blogs = Blog.all
  end
end
