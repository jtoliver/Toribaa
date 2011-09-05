class CreateHomes < ActiveRecord::Migration
  def change
    create_table :homes do |t|
      t.string :title
      t.text   :description
      t.string :category
      t.string :image_url
      t.string :video_url
      t.string :song_url
      t.string :technologies

      t.timestamps
    end
  end
end
