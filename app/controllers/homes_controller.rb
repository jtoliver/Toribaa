class HomesController < ApplicationController
  respond_to :html, :js
  
  def index
    @homes = Home.all
  end
  
  
  def within_a_div
     index
   end

  def show
    @home = Home.find(params[:id])
  end

  def new
    @homes = Home.all
    @home = Home.new
  end

  def edit
    @home = Home.find(params[:id])
  end

  def create
    @home = Home.new(params[:home])

    respond_to do |format|
      if @home.save
        format.html { redirect_to(:action => 'new', :notice => 'Home was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    @home = Home.find(params[:id])

    respond_to do |format|
      if @home.update_attributes(params[:home])
        format.html { redirect_to(@home, :notice => 'Home was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @home = Home.find(params[:id])
    @home.destroy
  end
end
