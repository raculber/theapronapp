import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import "./Pantry.css";
import axios from "axios";
import IngredientDisplay from "./IngredientDisplay";
const Pantry = () => {
  const userId = useSelector((state) => state.user.userId);
  const [ingredientSearch, setIngredientSearch] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({
    name: "",
    image: "",
  });
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ingredients.length === 0) {
      axios
        .get("http://localhost:3001/api/get-ingredients?userId=" + userId, {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setIngredients(res.data.ingredients);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const removeIngredient = () => {
    axios
      .delete("http://localhost:3001/api/delete-ingredient", {
        data: { userId: userId, ingredientId: 18064 },
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIngredients = () => {
    axios
      .get("http://localhost:3001/api/get-ingredients?userId=" + userId, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addIngredient = () => {
    axios
      .post("http://localhost:3001/api/add-ingredient", {
        userId: userId,
        ingredientName: selectedIngredient.name,
        image: selectedIngredient.image,
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onItemSelected = (event, value) => {
    console.log(value);

    setSelectedIngredient(value);
  };

  const onQueryChange = (event, value) => {
    console.log(value);
    setSelectedIngredient({ name: "", image: "" });
    axios
      .get(
        "http://localhost:3001/api/autocomplete-ingredient-search?query=" +
          value,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIngredientSearch(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closed = () => {
    console.log("closed");
  };
  return (
    <div className="pantry">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={ingredientSearch}
        className="search-bar"
        getOptionLabel={(option) => option.name}
        onChange={onItemSelected}
        onInputChange={onQueryChange}
        renderInput={(params) => (
          <TextField {...params} label="Search Ingredients" />
        )}
      />
      {/* <SearchBar className="search-bar" onChange={onQueryChange} /> */}
      <button onClick={addIngredient}>Add Ingredient</button>
      <button onClick={getIngredients}>Get Ingredients</button>
      <button onClick={removeIngredient}>Remove Ingredient</button>
      {ingredients.map((ingredient) => (
        <IngredientDisplay ingredient={ingredient} key={ingredient.name} />
      ))}
      <Snackbar
        open={error !== ""}
        anchorOrigin={{ vertical: "center", horizontal: "bottom" }}
        autoHideDuration={4000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default Pantry;
