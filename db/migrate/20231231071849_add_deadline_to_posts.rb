class AddDeadlineToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :deadline, :datetime
  end
end
