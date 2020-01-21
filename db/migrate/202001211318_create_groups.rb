class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      #元々の#t.string :name, null: false, unique: true, index: true
      t.string :name, null: false #カリキュラム分
      t.index :name, unique: true #カリキュラム分
      t.timestamps
    end
  end
end