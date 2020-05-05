import { useState, useEffect } from "react";
import axios from "axios";
import uniqueRecipe from "../helper/uniqueRecipe";
import duplcateRecipe from "../helper/duplicateRecipe";
import recipeFormatter from "../helper/recipeFormatter";
import { Recipes } from "../components/interfaces/Recipe.interface";
import {
  SessionUser,
  SignupUser,
  LoginUser,
} from "../components/interfaces/User.interface";

const useUserData = (): {
  savedRecipes: Recipes[];
  setSavedRecipes: React.Dispatch<React.SetStateAction<Recipes[]>>;
  sessionUser: SessionUser | null;
  setSessionUser: React.Dispatch<SessionUser>;
  userSignup: (user: SignupUser) => void;
  userLogin: (user: LoginUser) => void;
  userLogout: () => void;
  deleteRecipe: (recipe: Recipes) => void;
  handleAdd: (recipe: Recipes) => void;
} => {
  const [savedRecipes, setSavedRecipes] = useState<Recipes[]>([]);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(
    JSON.parse(localStorage.getItem("sessionUser")!) || null
  );

  useEffect(() => {
    if (sessionUser) {
      axios.get(`/api/users/${sessionUser.id}`).then((response) => {
        setSavedRecipes(response.data.data);
      });
    }
  }, [sessionUser]);

  const userSignup = (user: SignupUser): void => {
    axios.post("/api/users", { user }).then((response) => {
      setSessionUser(response.data.data);
      localStorage.setItem("sessionUser", JSON.stringify(response.data.data));
    });
  };

  const userLogin = (user: LoginUser): void => {
    axios.post("/api/login", user).then((response) => {
      setSessionUser(response.data.data);
      localStorage.setItem("sessionUser", JSON.stringify(response.data.data));
    });
  };

  const userLogout = (): void => {
    setSessionUser(null);
    setSavedRecipes([]);
    localStorage.removeItem("sessionUser");
    axios.get("/api/logout").then(() => console.log("logout"));
  };

  const deleteRecipe = (recipe: Recipes): void => {
    setSavedRecipes((prev) => prev.filter((item) => item.id !== recipe.id));
    axios
      .delete(`/api/recipe/${recipe.id}`, { data: recipe })
      .then(() => console.log("deleted"));
  };

  const handleAdd = (recipe: Recipes): void => {
    if (duplcateRecipe(savedRecipes, recipe)) {
      setSavedRecipes((prev) => [...uniqueRecipe(prev, recipe)]);
    } else {
      const formattedRecipe = recipeFormatter(recipe);

      axios.post("/api/recipe", formattedRecipe).then((response) => {
        setSavedRecipes((prev) => [response.data.data, ...prev]);
      });
    }
  };

  return {
    savedRecipes,
    setSavedRecipes,
    sessionUser,
    setSessionUser,
    userSignup,
    userLogin,
    userLogout,
    deleteRecipe,
    handleAdd,
  };
};

export default useUserData;
