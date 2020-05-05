import React from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./homepage/SearchBar";
import RecipesCardsLists from "./homepage/RecipesCardsLists";
import useSearchResult from "../hooks/useSearchResult";
import { Recipes } from "./interfaces/Recipe.interface";

// SearchBar, RecipesCardsLists
interface Props {
  handleAdd: (recipe: Recipes) => void;
}

export const Home: React.FC<Props> = (props) => {
  const { handleAdd } = props;
  const { searchResult, handleSearch, searchInfo } = useSearchResult();

  let history = useHistory();

  const handleRedirect = (recipe: Recipes): void => {
    history.push("/recipe", { recipe });
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <RecipesCardsLists
        searchResultRecipes={searchResult}
        handleAdd={handleAdd}
        searchInfo={searchInfo}
        clickRecipe={(recipe: Recipes) => {
          handleRedirect(recipe);
        }}
      />
    </div>
  );
};
