import { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import RecipeModal from "./RecipeModal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import veganIcon from "../../images/vegan-icon.jpg";
import glutenFreeIcon from "../../images/gluten_free.jpg";

import recipe from "./recipe";
import axios from "axios";

const recipeData = recipe;
const RecipeCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [iconColor, setIconColor] = useState("A9A9A9");

  const userId = useSelector((state) => state.user.userId);

  const getRecipeSaved = useCallback(() => {
    console.log(recipe.id);
    console.log(userId);
    axios
      .get(
        "http://localhost:3001/api/get-recipe-saved?id=" +
          recipe.id +
          "&userId=" +
          userId,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.recipeExists);
        setIconColor(res.data.recipeExists ? "#FF0000" : "A9A9A9");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);
  useEffect(() => {
    getRecipeSaved();
  }, [getRecipeSaved]);

  const alertClosedHandler = () => {
    setAlertMessage("");
  };
  const recipeSaveHandler = () => {
    console.log("Saving");
    axios
      .post("http://localhost:3001/api/save-recipe", {
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
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "Added to favorites") {
          setIconColor("#FF0000");
        } else {
          setIconColor("A9A9A9");
        }
        setAlertMessage(res.data.message);
      })
      .catch((err) => {});
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  console.log(iconColor);
  const showModalHandler = (event) => {
    //Do not display modal if user clicked "save"
    if (event.target.tagName !== "path") setShowModal(true);
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
              <FavoriteIcon
                sx={{
                  color: iconColor,
                  cursor: "pointer",
                }}
              />
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
      <Snackbar
        open={alertMessage !== ""}
        autoHideDuration={4000}
        onClose={alertClosedHandler}
      >
        <Alert
          onClose={alertClosedHandler}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default RecipeCard;
