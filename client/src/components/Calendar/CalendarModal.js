import Modal from "../UI/Modal";
import CustomRecipeCard from "../Recipe/CustomRecipeCard";
import "./CalendarModal.css";
const CalendarModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className="modal">
        {props.recipes.map((recipe) => (
          <CustomRecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </Modal>
  );
};

export default CalendarModal;
