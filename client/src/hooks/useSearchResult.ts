import { useEffect, useState } from "react";
import axios from "axios";
import recipesDataHelper from "../helper/recipesDataHelper";
import {
  keyeordList,
  mealTypeList,
  healthLabelList,
  random,
} from "../helper/randomSearchArrays";
import { Recipes } from "../components/interfaces/Recipe.interface";

const useSearchResult = (): {
  searchResult: Recipes[];
  handleSearch: (value: string, tags: { [key: string]: boolean }) => void;
  searchInfo: string[] | null;
} => {
  const [searchResult, setSearchResult] = useState<string>(
    localStorage.getItem("searchResult")!
  );

  const [searchInfo, setSearchInfo] = useState<string[] | null>([]);

  const appInfo = `&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&from=0&to=100`;
  const apiBaseURL = `https://api.edamam.com/search?q=`;

  useEffect(() => {
    if (!localStorage.getItem("searchResult")) {
      const keyword = random(keyeordList);
      const mealType = random(mealTypeList);
      const healthLabel = random(healthLabelList);
      const randomRecipe = `${keyword}&mealtype=${mealType}&health=${healthLabel}`;

      setSearchInfo([keyword, mealType, healthLabel]);

      axios.get(apiBaseURL + randomRecipe + appInfo).then((response) => {
        setSearchResult(JSON.stringify(recipesDataHelper(response)));
        localStorage.setItem(
          "searchResult",
          JSON.stringify(recipesDataHelper(response))
        );
      });
    }
  }, []);

  const handleSearch = (value: string, tags: { [key: string]: boolean }) => {
    const tagsArr: string[] = [];
    const infoArr: string[] = [];
    for (let tag in tags) {
      tags[tag] && tagsArr.push(`health=${tag}`) && infoArr.push(tag);
    }
    const healthTags = tagsArr.length !== 0 ? `&${tagsArr.join("&")}` : "";

    setSearchInfo([value, ...infoArr]);

    axios.get(apiBaseURL + value + appInfo + healthTags).then((response) => {
      setSearchResult(JSON.stringify(recipesDataHelper(response)));
      localStorage.setItem(
        "searchResult",
        JSON.stringify(recipesDataHelper(response))
      );
    });
  };

  return {
    searchResult: JSON.parse(searchResult),
    handleSearch,
    searchInfo,
  };
};

export default useSearchResult;
