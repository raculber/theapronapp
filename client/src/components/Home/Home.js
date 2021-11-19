import axios from "axios";
import Pagination from "@mui/material/Pagination";
import SearchBar from "material-ui-search-bar";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import { useEffect, useState } from "react";
import RecipeCard from "../Recipe/RecipeCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import "./Home.css";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(5);
  const [page, setPage] = useState(1);
  const [diet, setDiet] = useState("");
  const [exclusions, setExclusions] = useState({
    glutenFree: false,
    dairyFree: false,
    seafood: false,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (totalRecipes.length === 0) {
      setLoading(true);
      axios
        .get("http://localhost:3001/api/get-random-recipes?number=100")
        .then((res) => {
          setTotalRecipes(res.data.recipes.results);
          console.log(res.data.recipes.results);
          setRecipes(res.data.recipes.results.slice(0, 20));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const pageChangeHandler = (event, value) => {
    setPage(value);
    console.log(totalRecipes);
    if (value < 6) {
      setRecipes(totalRecipes.slice(20 * (value - 1), 20 * value));
    }
  };

  const exlcusionsChangeHandler = (event) => {
    if (event.target.value === "glutenFree") {
      setExclusions({ ...exclusions, glutenFree: !exclusions.glutenFree });
    } else if (event.target.value === "dairyFree") {
      setExclusions({ ...exclusions, dairyFree: !exclusions.dairyFree });
    } else if (event.target.value === "seafood") {
      setExclusions({ ...exclusions, seafood: !exclusions.seafood });
    }
  };
  const dietChangeHandler = (event) => {
    if (event.target.value === "vegan") {
      setDiet("vegan");
    } else if (event.target.value == "vegetarian") {
      setDiet("vegetarian");
    }
  };
  const searchRecipes = (query) => {
    setLoading(true);
    let dietFilter = "";
    let intoleranceFilter = "";
    if (diet === "vegan") {
      dietFilter = "&diet=vegan";
    } else if (diet === "vegetarian") {
      dietFilter = "&diet=vegetarian";
    }
    if (exclusions.glutenFree) {
      console.log("Gluten Free");
      intoleranceFilter = "&intolerances=gluten";
    }
    if (exclusions.dairyFree && intoleranceFilter === "") {
      intoleranceFilter = "&intolerances=gluten";
    } else if (exclusions.dairyFree) {
      intoleranceFilter += ",dairy";
    }
    if (exclusions.seafood && intoleranceFilter === "") {
      intoleranceFilter = "&intolerances=seafood";
    } else if (exclusions.seafood) {
      intoleranceFilter += ",seafood";
    }
    axios
      .get(
        "http://localhost:3001/api/get-recipes-by-query?number=100&search=" +
          query +
          dietFilter +
          intoleranceFilter
      )
      .then((res) => {
        setTotalRecipes(res.data.recipes.results);
        setPageCount(Math.ceil(res.data.recipes.results.length / 20));
        setRecipes(res.data.recipes.results.slice(20 * (page - 1), 20 * page));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="search">
        <SearchBar
          style={{
            width: "50%",
            margin: 10,
            marginLeft: 15,
          }}
          onRequestSearch={(value) => {
            searchRecipes(value);
          }}
        />
        <Accordion
          sx={{
            width: "30%",
            margin: 0,
            marginTop: 1,
            ["@media (max-width:830px)"]: {
              width: "50%",
              marginLeft: "15px",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: 0, marginLeft: 1 }}
          >
            <Typography>Filter Recipes</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "row" }}>
            <RadioGroup>
              <Typography>Diets</Typography>
              <FormControlLabel
                control={
                  <Radio
                    value="vegan"
                    onChange={dietChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegan"
              />
              <FormControlLabel
                control={
                  <Radio
                    value="vegetarian"
                    onChange={dietChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegetarian"
              />
            </RadioGroup>
            <FormGroup>
              <Typography>Exclusions</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    value="glutenFree"
                    onChange={exlcusionsChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Gluten Free"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="dairyFree"
                    onChange={exlcusionsChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Dairy Free"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="seafood"
                    onChange={exlcusionsChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Seafood"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
      {loading && (
        <CircularProgress sx={{ margin: "auto" }} color="secondary" />
      )}

      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <Stack spacing={2} sx={{ margin: "auto" }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={pageChangeHandler}
        />
      </Stack>
    </div>
  );
};
export default Home;
