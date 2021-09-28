import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import ClinicsList from "../components/Clinics/ClinicsList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";
import Image from "react-bootstrap/Image"

export default function Clinics() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(clinic) {
    context.addClinic(clinic);
    handleCancel();
  }
  function handleUpdate(clinic) {
    context.updClinic(clinic);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delClinic(id);
  }
  function handleModalShow(clinic) {
    setSelected(clinic);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(clinic) {
    setFormText("Edit clinic");
    setSelected(clinic);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Add new clinic");
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
      <h1>Clinics page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new clinic
        </Button>
      </div>
      <ClinicsList
        clinics={context.clinics}
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
  const titleRef = useRef();
  const districtRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState((selected && selected.image)?selected.image:'')

  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      title: titleRef.current.value,
      district: districtRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value
    };
    if (imageRef.current.value && imageRef.current.value !== "") {
      data.image = imageRef.current.value
    }
    if (selected) {
      data.id = selected.id;
    }
    handleSubmit.onSubmit(data);
  }
  function imagePreviewHandler(e) {
    setImagePreview(e.target.value)
  }
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{formText}</h2>
            <Form>
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={titleRef}
                  defaultValue={selected.title}
                />
              </Form.Group>
              <Form.Group id="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={districtRef}
                  defaultValue={selected.district}
                />
              </Form.Group>
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={addressRef}
                  defaultValue={selected.address}
                />
              </Form.Group>
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={phoneRef}
                  defaultValue={selected.phone}
                />
              </Form.Group>
              <Form.Group id="image" className="mb-5">
                <Form.Label>Image url</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={imageRef}
                  defaultValue={selected.image}
                  onChange={imagePreviewHandler}
                />
                <Image className="mt-5" src={imagePreview} fluid />
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
