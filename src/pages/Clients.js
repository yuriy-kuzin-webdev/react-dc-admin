import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import ClientList from "../components/Clients/ClientsList";
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

  function handleCreate(client) {
    context.addClient(client);
    handleCancel();
  }
  function handleUpdate(client) {
    context.updClient(client);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delClient(id);
  }
  function handleModalShow(client) {
    setSelected(client);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(client) {
    setFormText("Edit a client");
    setSelected(client);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Register new client");
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
      <h1>Clients page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Register New Client
        </Button>
      </div>
      <ClientList
        clients={context.clients}
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
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
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
              <Form.Group id="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={nameRef}
                  defaultValue={selected.name}
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={emailRef}
                  defaultValue={selected.email}
                />
              </Form.Group>
              <Form.Group id="phone" className="mb-5">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={phoneRef}
                  defaultValue={selected.phone}
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
