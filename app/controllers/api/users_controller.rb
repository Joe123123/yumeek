# frozen_string_literal: true

class Api::UsersController < ApplicationController
  def show
    if session[:user_id].to_s == params[:id]
      @response = Recipe.find_by_sql(["
      SELECT Recipes.id, label, weekday, energies, carbs, fat, protein, fiber, img_url, src_url, health_labels, ingredients
      FROM Recipes
      Right OUTER JOIN Nutrients ON Recipes.id=Nutrients.recipe_id
      join user_recipes on Recipes.id=user_recipes.recipe_id where user_recipes.user_id=?", params[:id]])

      render json: { data: @response }
    else
      render json: { error: 'Only owner can view the dashboard' }
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      # redirect user to home page after signup
      render json: { data: user }
    else
      # redirect user to home page after signup failed
      render json: { error: 'Signup failed' }
    end
  end

  def fetchuser
    render json: { user_id: session[:user_id] }
  end

  def fetchweek
    # if session[:user_id].to_s == params[:id]
    @response = Recipe.find_by_sql(["
      SELECT weekday, sum(energies) as energies,sum(carbs) as carbs, sum(fat) as fat, sum(protein) as protein, sum(fiber) as fiber
      FROM Recipes
      Right OUTER JOIN Nutrients ON Recipes.id=Nutrients.recipe_id
      join user_recipes on Recipes.id=user_recipes.recipe_id
      where user_recipes.user_id=?
      group by weekday", params[:id]])

    render json: { data: @response }
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end
