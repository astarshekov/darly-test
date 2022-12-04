import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataCreated } from "../redux/formSlice";
import { useSelector } from "react-redux";

import "../custom.css";

const Form = () => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [favoriteLanguage, setFavoriteLanguage] = useState("");

  const [idError, setIdError] = useState(null);
  const [fNameError, setFNameError] = useState(null);
  const [lNameError, setLNameError] = useState(null);
  const [positionError, setPositionError] = useState(null);
  const [favoriteLanguageError, setFavoriteLanguageError] = useState(null);

  const isTableDataLoadingState = useSelector(
    (state) => state.table.isTableDataLoading
  );

  const dispatch = useDispatch();

  const onIdChange = (event) => {
    setId(event.target.value);
    const value = event.target.value;
    if (!value.match(/^\d+$/)) setIdError("Please use numbers");
    else setIdError(null);
  };
  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
    const value = event.target.value;
    if (!value.match(/^[a-zA-Z]+$/g)) setFNameError("Please use letters");
    else setFNameError(null);
  };
  const onLastNameChange = (event) => {
    setLastName(event.target.value);
    const value = event.target.value;
    if (!value.match(/^[a-zA-Z]+$/g)) setLNameError("Please use letters");
    else setLNameError(null);
  };
  const onPositionChange = (event) => {
    setPosition(event.target.value);
    const value = event.target.value;
    if (!value.match(/^[a-zA-Z]+$/g)) setPositionError("Please use letters");
    else setPositionError(null);
  };
  const onFavoriteLanguageChange = (event) => {
    setFavoriteLanguage(event.target.value);
    const value = event.target.value;
    if (!value.match(/^[a-zA-Z]+$/g))
      setFavoriteLanguageError("Please use letters");
    else setFavoriteLanguageError(null);
  };

  const resetFields = (e) => {
    e.preventDefault();
    setId("");
    setFirstName("");
    setLastName("");
    setPosition("");
    setFavoriteLanguage("");
  };

  const sendData = (e) => {
    e.preventDefault();
    setIdError(null);
    setFNameError(null);
    setLNameError(null);
    setPositionError(null);
    setFavoriteLanguageError(null);

    const data = {
      id: id,
      first_name: firstName,
      last_name: lastName,
      position: position,
      favorite_lang: favoriteLanguage,
    };

    axios
      .post("http://localhost:3000/developer_details", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 201) {
          dispatch(dataCreated());
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        sendData(e);
        resetFields(e);
      }}
    >
      <div>
        <h1>Add your details</h1>
        <p>Please fill in this form to make a new entry</p>
        <hr />
      </div>
      <input
        type="text"
        value={id}
        onChange={onIdChange}
        placeholder="Id"
        required
      />
      {idError && <div className="error-message">{idError}</div>}
      <input
        type="text"
        value={firstName}
        onChange={onFirstNameChange}
        placeholder="First name"
        required
      />
      {fNameError && <div className="error-message">{fNameError}</div>}
      <input
        type="text"
        value={lastName}
        onChange={onLastNameChange}
        placeholder="Last name"
        required
      />
      {lNameError && <div className="error-message">{lNameError}</div>}
      <input
        type="text"
        value={position}
        onChange={onPositionChange}
        placeholder="Position"
        required
      />
      {positionError && <div className="error-message">{positionError}</div>}
      <input
        type="text"
        value={favoriteLanguage}
        onChange={onFavoriteLanguageChange}
        placeholder="Fav language"
        required
      />
      {favoriteLanguageError && (
        <div className="error-message">{favoriteLanguageError}</div>
      )}
      <button
        className="submit-button"
        disabled={
          isTableDataLoadingState ||
          idError ||
          fNameError ||
          lNameError ||
          positionError ||
          favoriteLanguageError
        }
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
