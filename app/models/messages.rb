class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  #validates :body, presence: true
  validates :content, presence: true, unless: :image? #カリキュラム追加
  mount_uploader :image, ImageUploader
end