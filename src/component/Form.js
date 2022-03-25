import React, { useEffect, useState } from "react";
import "../assets/Form.css";

const Form = ({
  setUsers,
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  password,
  setPassword,
  handleSubmit,
  isEditable,
  updateHandler,
}) => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  // const [password, setPassword] = useState("");
  const url = "http://localhost:3000/todos";

  return (
    <div className="form__section">
      <form
        className="form__container"
        onSubmit={isEditable ? updateHandler : handleSubmit}
      >
        <div className="m-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="form-control input__filed"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="m-2">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            className="form-control input__filed"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-2">
          <input
            type="number"
            placeholder="Number"
            value={number}
            className="form-control input__filed"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="m-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="form-control input__filed"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit__button">
          {isEditable ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
