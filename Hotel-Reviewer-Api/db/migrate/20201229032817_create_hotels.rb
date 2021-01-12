class CreateHotels < ActiveRecord::Migration[6.0]
  def change
    create_table :hotels do |t|
      t.string :name
      t.string :island
      t.integer :cost
      t.string :address
      t.string :imgs
      t.string :number

      t.timestamps
    end
  end
end
