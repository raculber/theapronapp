import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import RecipeModal from "./RecipeModal";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import veganIcon from "../../images/vegan-icon.jpg";
import glutenFreeIcon from "../../images/gluten_free.jpg";

import recipe from "./recipe";
import axios from "axios";

const recipeData = recipe;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState(recipeData);

  const userId = useSelector((state) => state.user.userId);

  //   const getRecipe = useCallback(() => {
  //     axios
  //       .get(
  //         "https://api.spoonacular.com/recipes/informationBulk?apiKey=" +
  //           process.env.REACT_APP_API_KEY +
  //           "&ids=" +
  //           props.id +
  //           "&includeNutrition=true"
  //       )
  //       .then((res) => {
  //         setRecipe(res.data[0]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [props.id]);
  //   useEffect(() => {
  //     console.log("In effect");
  //     getRecipe();
  //   }, [getRecipe]);
  let modifiedSummary = recipe.summary ? recipe.summary : null;

  modifiedSummary = modifiedSummary.replace(/<\/?[^>]+(>|$)/g, "");
  var linebreak = "\n";

  const recipeSaveHandler = () => {
    console.log("Saving");
    axios.post("http://localhost:3001/api/save-recipe", {
      userId: userId,
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.extendedIngredients,
      vegan: recipe.vegan,
      vegetarian: recipe.vegetarian,
      glutenFree: recipe.glutenFree,
      dairyFree: recipe.dairyFree,
      veryHealthy: recipe.veryHealthy,
      cheap: recipe.cheap,
      summary: recipe.summary,
      image: recipe.image,
      instructions: recipe.analyzedInstructions[0].steps,
      readyInMinutes: recipe.readyInMinutes,
      nutrients: recipe.nutrition.nutrients,
      headers: {
        "access-token": localStorage.getItem("token"),
      },
    });
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  const showModalHandler = (event) => {
    //Do not display modal if user clicked "save"
    if (event.target.tagName != "path") setShowModal(true);
  };
  return (
    <Fragment>
      {showModal && (
        <RecipeModal onClose={hideModalHandler} recipe={recipeData} />
      )}
      <Card
        sx={{
          maxWidth: 345,
          cursor: "pointer",
          zIndex: 1,
          position: "relative",
        }}
        onClick={showModalHandler}
      >
        <CardHeader
          action={
            <IconButton aria-label="Save recipe" onClick={recipeSaveHandler}>
              <FavoriteIcon style={{ color: "8B0000", cursor: "pointer" }} />
            </IconButton>
          }
          title={recipe.title ? recipe.title : "No title"}
          subheader={
            recipe.servings && recipe.nutrition.nutrients[0].amount
              ? "Servings: " +
                recipe.servings +
                " Calories: " +
                Math.round(recipe.nutrition.nutrients[0].amount) +
                " Ready In: " +
                recipe.readyInMinutes +
                " minutes"
              : ""
          }
        />
        <CardMedia
          component="img"
          height="150"
          image={recipe.image && recipe.image}
          alt={recipe.title ? recipe.title : "No title"}
        />
        <CardContent>
          {recipe.vegan && (
            <img
              width="45"
              height="45"
              alt="Vegan"
              title="Vegan"
              src={veganIcon}
            />
          )}
          {recipe.glutenFree && (
            <img
              width="45"
              height="45"
              alt="Gluten Free"
              title="Gluten Free"
              src={glutenFreeIcon}
            />
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default RecipeCard;
