# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  
  has_many :user_recipes
  has_many :recipes, through: :user_recipes
end
