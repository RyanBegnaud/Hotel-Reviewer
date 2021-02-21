class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :review_text
      t.string :imgs
      t.integer :hotel_id
      t.integer :user_id

      t.timestamps
    end
  end
end
