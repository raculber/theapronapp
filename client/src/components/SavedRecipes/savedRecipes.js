import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecipeCard from "../Recipe/RecipeCard";
import CustomRecipeCard from "../Recipe/CustomRecipeCard";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import SearchBar from "material-ui-search-bar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import CustomIngredientsTable from "../Recipe/CustomIngredientsTable";

const theme = createTheme();

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState([]); //use totalRecipes array to search
  const [pageCount, setPageCount] = useState(5);
  const [page, setPage] = useState(1);
  const userId = useSelector((state) => state.user.userId);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (totalRecipes.length === 0) {
      setLoading(true);
      axios
        .get("http://localhost:3001/api/get-saved-recipes?userId=" + userId, {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setTotalRecipes(res.data.recipes);
          console.log(res.data.recipes);
          setRecipes(res.data.recipes.slice(0, 20));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  });

  const pageChangeHandler = (event, value) => {
    setPage(value);
    console.log(totalRecipes);
    if (value < 6) {
      setRecipes(totalRecipes.slice(20 * (value - 1), 20 * value));
    }
  };

  //const searchRecipes = (query) => {};

  return (
    <div className="savedrecipes">
      {/* <div className="search">
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
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: 0, marginLeft: 1 }}
          ></AccordionSummary>
          <AccordionDetails sx={{ display: "flex", flexDirection: "row" }}>
            <FormGroup>
              <Typography>Exclusions</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    value="glutenFree"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Gluten Free"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="dairyFree"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Dairy Free"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="seafood"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Seafood"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div> */}
      {loading && (
        <CircularProgress sx={{ margin: "auto" }} color="secondary" />
      )}

      <div className="recipes">
        {recipes.map((recipe) => (
          <CustomRecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
      <Stack spacing={2} sx={{ margin: "auto" }}>
        <Pagination
          sx={{ margin: "auto" }}
          count={pageCount}
          page={page}
          onChange={pageChangeHandler}
        />
      </Stack>
    </div>
  );
}
