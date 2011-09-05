class AddPhotoToHomes < ActiveRecord::Migration
  def change
    add_column :homes, :port_file_name,    :string
    add_column :homes, :port_content_type, :string
    add_column :homes, :port_file_size,    :integer
    add_column :homes, :port_updated_at,   :datetime
  end
end
