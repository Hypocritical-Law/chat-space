# データベース:chat-space

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null:false, unique:true|
|mail|string|null: false, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|foreign_key: true, null: false|
|body|text||
|image|string||
|group|references|foreign_key: true, null: false|


### Association
- belongs_to :user
- belongs_to :group


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null:false, unique:true|

### Association

- has_many :users, through: :group_users
- has_many :messages
- has_many :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group|references|foreign_key: true, null: false|
|user|references|foreign_key: true, null: false|

### Association
- belongs_to :user
- belongs_to :group
