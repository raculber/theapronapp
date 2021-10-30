import classes from "./Modal.module.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <IconButton
        sx={{ position: "absolute", top: 10, right: 10 }}
        onClick={props.onClose}
      >
        <CloseIcon sx={{ width: 40, height: 40 }} />
      </IconButton>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
