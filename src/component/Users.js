import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/Users.css";
import Loading from "./Loading";
import User from "./User";
import Form from "./Form";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [editableTodo, setEditableTodo] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  console.log(isEditable);

  // ===========Get Data
  const url = "http://localhost:3000/todos";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUsers(data);
      });
  }, []);
  // ===============Post Data Into Database
  const handleSubmit = (e) => {
    e.preventDefault();
    const NewUser = {
      id: new Date(),
      name: name,
      email: email,
      password: password,
      number: number,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(NewUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setUsers([data, ...users]);
        // setName("");
        // setEmail("");
        // setNumber("");
        // setPassword("");
        fetch(url)
          .then((res) => res.json())
          .then((allUsers) => {
            setUsers(allUsers);
            setName("");
            setEmail("");
            setNumber("");
            setPassword("");
          });
      });
  };
  // ======Edit Handler connected with Update
  const editHandler = (id) => {
    const editableTodo = users.find((user) => user.id === id);
    setEditableTodo(editableTodo);
    // console.log(editableTodo);
    setIsEditable(true);
    setName(editableTodo.name);
    setEmail(editableTodo.email);
    setNumber(editableTodo.number);
  };
  // =============Update Data
  const updateHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/todos/${editableTodo.id}`, {
      // 'PATCH' korle sudu Ami je Data Ta Change Korte chassi seta Change Hobe But 'PUT' korle ager data sob miss hobe and updated Data gulo sudu thakbe
      method: "PATCH",
      body: JSON.stringify({
        // id: editableTodo.id,
        name: name,
        email: email,
        number: number,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            setName("");
            setEmail("");
            setNumber("");
            setIsEditable(false);
            setEditableTodo(null);
          });
      });
  };
  // =========Delete Data
  const deleteHandler = (id) => {
    // const toBeDeleted = users.find((user) => user.id === id);
    // console.log(toBeDeleted);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setUsers(data));
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="users__section">
            <Form
              users={users}
              setUsers={setUsers}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              number={number}
              setNumber={setNumber}
              password={password}
              setPassword={setPassword}
              isEditable={isEditable}
              handleSubmit={handleSubmit}
              updateHandler={updateHandler}
            />
            {loading ? (
              <Loading />
            ) : (
              <div className="user__row__container">
                {users.map((user) => {
                  return (
                    <User
                      key={user.id}
                      user={user}
                      deleteHandler={deleteHandler}
                      editHandler={editHandler}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
