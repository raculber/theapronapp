import { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomRecipeModal from "./CustomRecipeModal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import TodayIcon from "@mui/icons-material/Today";
import ListAltIcon from "@mui/icons-material/ListAlt";
import veganIcon from "../../images/vegan-icon.jpg";
import glutenFreeIcon from "../../images/gluten_free.jpg";
import dollarIcon from "../../images/dollar_icon.png";
import CardActions from "@mui/material/CardActions";
import vegetarianIcon from "../../images/vegetarian_icon.jpg";
import dairyFree from "../../images/dairy_free.png";
import TodayIcon from "@mui/icons-material/Today";
// import recipe from "./recipe";
import axios from "axios";

const CalendarRecipeCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const recipes = useSelector((state) => state.groceryList.recipes);
  const [iconColor, setIconColor] = useState("#A9A9A9");
  const [shoppingCartColor, setShoppingCartColor] = useState("#000000");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const getRecipeSaved = useCallback(() => {
    axios
      .get(
        "http://localhost:3001/api/get-recipe-saved?id=" +
          props.recipe.id +
          "&userId=" +
          userId,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIconColor(res.data.recipeExists ? "#FF0000" : "#A9A9A9");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.recipe.id, userId]);

  const hideModalHandler = () => {
    setShowModal(false);
  };
  const showModalHandler = (event) => {
    //Do not display modal if user clicked "save"
    if (event.target.tagName !== "path") setShowModal(true);
  };

  return (
    <Fragment>
      {showModal && (
        <CustomRecipeModal onClose={hideModalHandler} recipe={props.recipe} />
      )}
      <Card
        className="card"
        onClick={showModalHandler}
        sx={{
          maxWidth: 330,
          cursor: "pointer",
          zIndex: 1,
          position: "relative",
          margin: 2,
          ["@media (max-width:730px)"]: {
            maxWidth: 300,
            margin: 1,
          },
        }}
      >
        <CardHeader
          action={
            <CardActions disableSpacing>
              <IconButton
                aria-label="Add to grocery list"
                onClick={addToGroceryList}
              >
                <TodayIcon
                  sx={{
                    cursor: "pointer",
                    zIndex: 100,
                  }}
                />
              </IconButton>
            </CardActions>
          }
          title={props.recipe.title ? props.recipe.title : "No title"}
          subheader={
            props.recipe.servings
              ? "Servings: " +
                props.recipe.servings +
                " Calories: " +
                Math.round(props.recipe.nutrients[0].amount) +
                " Ready In: " +
                props.recipe.readyInMinutes +
                " minutes"
              : ""
          }
        />
        <CardMedia
          component="img"
          height="150"
          image={props.recipe.image && props.recipe.image}
          alt={props.recipe.title ? props.recipe.title : "No title"}
        />
        <CardContent>
          {props.recipe.vegetarian && !props.recipe.vegan && (
            <img
              width="45"
              height="45"
              alt="Vegetarian"
              title="Vegetarian"
              src={vegetarianIcon}
            />
          )}
          {props.recipe.vegan && (
            <img
              width="45"
              height="45"
              alt="Vegan"
              title="Vegan"
              src={veganIcon}
            />
          )}
          {props.recipe.glutenFree && (
            <img
              width="45"
              height="45"
              alt="Gluten Free"
              title="Gluten Free"
              src={glutenFreeIcon}
            />
          )}
          {props.recipe.dairyFree && (
            <img
              width="45"
              height="45"
              alt="Dairy Free"
              title="Dairy Free"
              src={dairyFree}
            />
          )}
          {props.recipe.cheap && (
            <img
              width="45"
              height="45"
              alt="Budget Friendly"
              title="Budget Friendly"
              src={dollarIcon}
            />
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CalendarRecipeCard;
