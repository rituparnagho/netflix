import React from "react";
import "./Modal.css";

const Modal = ({ closeModal, confirmModal }) => {
  return (
    <>
      <div className="modal__wrapper">
        <div className="modal__container">
          <h3>
            Are your sure you want to delete <br /> your account ?
          </h3>
          <div className="btns">
            <button className="modal-cls-btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="modal-opn-btn" onClick={confirmModal}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;