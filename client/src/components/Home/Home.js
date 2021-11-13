import axios from "axios";
import Pagination from "@mui/material/Pagination";
import SearchBar from "material-ui-search-bar";
import Stack from "@mui/material/Stack";
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
import "./Home.css";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]);
  const [pageCount, setPageCount] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [checkBox, setCheckBox] = useState({
    vegan: false,
    vegetarian: false,
    glutenFree: false,
  });
  useEffect(() => {
    if (totalRecipes.length === 0) {
      axios
        .get("http://localhost:3001/api/get-random-recipes?number=100")
        .then((res) => {
          setTotalRecipes(res.data.recipes.results);
          console.log(res.data.recipes.results);
          setRecipes(res.data.recipes.results.slice(0, 20));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log(recipes);

  const pageChangeHandler = (event, value) => {
    setPage(value);
    console.log(totalRecipes);
    if (value < 6) {
      setRecipes(totalRecipes.slice(20 * (value - 1), 20 * value));
    }
  };

  const checkBoxChangeHandler = (event) => {
    console.log(event);
    let currentChange = "";
    if (event.target.value == "vegan") {
      setCheckBox({ ...checkBox, vegan: !checkBox.vegan });
    } else if (event.target.value == "vegetarian") {
      setCheckBox({ ...checkBox, vegetarian: !checkBox.vegetarian });
    } else if (event.target.value == "glutenFree") {
      setCheckBox({ ...checkBox, glutenFree: !checkBox.glutenFree });
    }
  };
  const searchRecipes = (query) => {
    console.log(query);
    setSearch(query);
    let dietFilter = "";
    let intoleranceFilter = "";
    if (checkBox.vegan) {
      dietFilter = "&diet=vegan";
    }
    if (checkBox.vegetarian) {
      dietFilter = "&diet=vegetarian";
    }
    if (checkBox.glutenFree) {
      intoleranceFilter = "&intolerances=gluten";
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
        console.log(res.data.recipes.results);
        setPageCount(Math.ceil(res.data.recipes.results.length / 20));
        setRecipes(res.data.recipes.results.slice(20 * (page - 1), 20 * page));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      <div className="search">
        <SearchBar
          style={{ width: "50%", margin: 10, marginLeft: 15 }}
          onRequestSearch={(value) => {
            searchRecipes(value);
          }}
        />
        <Accordion sx={{ width: "30%", margin: 2, marginTop: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filter Recipes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="vegan"
                    onChange={checkBoxChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegan"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="vegetarian"
                    onChange={checkBoxChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Vegetarian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="glutenFree"
                    onChange={checkBoxChangeHandler}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Gluten Free"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
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
