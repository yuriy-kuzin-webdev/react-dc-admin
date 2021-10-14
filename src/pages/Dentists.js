import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import DentistsList from "../components/Dentists/DentistsList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image"

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

export default function Dentists() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(dentist) {
    context.addDentist(dentist);
    handleCancel();
  }
  function handleUpdate(dentist) {
    context.updDentist(dentist);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delDentist(id);
  }
  function handleModalShow(dentist) {
    setSelected(dentist);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(dentist) {
    setFormText("Edit dentist");
    setSelected(dentist);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Add new dentist");
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
      clinics={context.clinics.map((c) => {
        return {
          clinicId: c.id,
          clinicName: c.title,
        };
      })}
    />
  ) : (
    <section>
      <h1>Dentists page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new dentist
        </Button>
      </div>
      <DentistsList
        dentists={context.dentists}
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

function UserForm({ selected, handleCancel, handleSubmit, formText, clinics }) {
  const [type, setType] = useState((selected && selected.type)? selected.type:1);
  const nameRef = useRef();
  const nameRuRef = useRef();
  const nameUaRef = useRef();
  const imageRef = useRef();
  const [imagePreview, setImagePreview] = useState((selected && selected.image)?selected.image:'');
  const [clinic, setClinic] = useState(
    selected && selected.clinicId && selected.clinicName
      ? {
          clinicId: selected.clinicId,
          clinicName: selected.clinicName,
        }
      : {}
  );
  function imagePreviewHandler(e) {
    setImagePreview(e.target.value)
  }
  function handleRadioChange(e) {
    e.persist();
    setType(parseInt(e.target.value));
  }
  function handleClinicChange(e) {
    const id = parseInt(e.target.value);
    const selectedClinic = clinics.find((c) => c.clinicId === id);
    console.log(selectedClinic);
    setClinic(selectedClinic);
  }
  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      type: type,
      name: nameRef.current.value,
      nameRu: nameRuRef.current.value,
      nameUa: nameUaRef.current.value,
    };
    if (clinic && clinic.clinicId && clinic.clinicName) {
      data.clinicId = clinic.clinicId;
    }
    if (imageRef.current.value && imageRef.current.value !== "") {
      data.image = imageRef.current.value
    }
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
                <Form.Label>Dentist Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={nameRef}
                  defaultValue={selected.name}
                />
              </Form.Group>
              <Form.Group id="nameRu">
                <Form.Label>Dentist Full Name Ru</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={nameRuRef}
                  defaultValue={selected.nameRu}
                />
              </Form.Group>
              <Form.Group id="nameUa">
                <Form.Label>Dentist Full Name Ua</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={nameUaRef}
                  defaultValue={selected.nameUa}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check name="type" type="radio" label="Dentist" value={1} checked={type === 1} onChange={handleRadioChange} inline/>
                <Form.Check name="type" type="radio" label="Surgeon" value={2} checked={type === 2} onChange={handleRadioChange} inline/>
              </Form.Group>
              <Form.Group id="clinic" className="mb-5">
                <Form.Label>Clinic(optional)</Form.Label>
                <Form.Select onChange={handleClinicChange}
                value={(clinic && clinic.clinicId) && clinic.clinicId}>
                  <option>Not selected</option>
                  {clinics.map((c) => {
                    return (
                      <option key={c.clinicId} value={c.clinicId}>
                        {c.clinicName}
                      </option>
                    );
                  })}
                </Form.Select>
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
