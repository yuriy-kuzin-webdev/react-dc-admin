import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import ManagersList from "../components/Managers/ManagersLists";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

export default function Managers() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(manager) {
    context.addManager(manager);
    handleCancel();
  }
  function handleUpdate(manager) {
    context.updManager(manager);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delManager(id);
  }
  function handleModalShow(manager) {
    setSelected(manager);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(manager) {
    setFormText("Edit a manager");
    setSelected(manager);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Register new manager");
    setSelected({});
    setSubmitHandle({
      onSubmit: handleCreate,
    });
    setIsFormActive(true);
  }

  return isFormActive ? (
    <UserForm
      selected={selected}
      handleCancel={handleCancel}
      handleSubmit={submitHandle}
      formText={formText}
    />
  ) : (
    <section>
      <h1>Managers page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Register New Manager
        </Button>
      </div>
      <ManagersList
        managers={context.managers}
        onDelete={handleModalShow}
        onEdit={handleFormEdit}
      />
      <Modal
        isActive={isModalActive}
        onCancel={handleCancel}
        onConfirm={handleDelete}
      />
      <Backdrop isActive={isModalActive} onCancel={handleCancel} />
    </section>
  );
}

function UserForm({ selected, handleCancel, handleSubmit, formText }) {
  const clinicIdRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      clinicId: parseInt(clinicIdRef.current.value),
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (selected) {
      data.id = selected.id;
    }
    handleSubmit.onSubmit(data);
  }
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{formText}</h2>
            <Form>
              <Form.Group id="clinicId">
                <Form.Label>Clinic Id</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={clinicIdRef}
                  defaultValue={selected.clinicId}
                />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={usernameRef}
                  defaultValue={selected.username}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-5">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={passwordRef}
                  defaultValue={selected.password}
                />
              </Form.Group>
              <Button
                className="w-100"
                variant="primary"
                type="submit"
                style={{ margin: 0 }}
                onClick={handleSubmitUserForm}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Button variant="primary" onClick={handleCancelUserForm}>
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
}
