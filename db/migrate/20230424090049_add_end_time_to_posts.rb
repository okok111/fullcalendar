class AddEndTimeToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :end_time, :datetime
  end
end
