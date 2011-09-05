class Home < ActiveRecord::Base
  #paperclip
  has_attached_file :port, 
		:styles => { :medium => "300x200#",
		:maxorg => "600x600",
		:thumb => "220x126#",
		:mobile => "80x80#"	},
		:storage => :s3,
    :s3_credentials => "#{Rails.root}/config/s3.yml",
    :path => "/:style/:id/:filename"
    
    def self.feed(last)
  		self.where("created_at < ? ", last).order('created_at desc').limit(5)
  	end
end
