import React from "react";

const User = ({ user, deleteHandler, editHandler }) => {
  return (
    <div
      className="d-flex flex-row justify-content-around align-items-center p-2 mb-2 shadow-sm bg-white"
      key={user.id}
    >
      <div>
        <input type="checkbox" />
      </div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.number}</div>
      <div>
        <button
          type="button"
          className="btn btn-secondary delete__btn"
          onClick={() => deleteHandler(user.id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-secondary edit__btn"
          onClick={() => editHandler(user.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default User;
