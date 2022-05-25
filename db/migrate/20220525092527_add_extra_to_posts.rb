class AddExtraToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :birthday, :datetime
  end
end
