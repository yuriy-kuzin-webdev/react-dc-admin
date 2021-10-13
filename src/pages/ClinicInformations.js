import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import ClinicInformationList from "../components/ClinicInformations/ClinicInformationList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

export default function ClinicInformations() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(info) {
    context.addClinicInformation(info);
    handleCancel();
  }
  function handleUpdate(info) {
    context.updClinicInformation(info);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.clinicId;
    handleCancel();
    context.delClinicInformation(id);
  }
  function handleModalShow(info) {
    setSelected(info);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(info) {
    setFormText("Edit info");
    setSelected(info);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Add new info");
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
      <h1>Clinic Informations page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new info
        </Button>
      </div>
      <ClinicInformationList
        informations={context.clinicInformations}
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
  const descriptionRef = useRef();
  const descriptionRuRef = useRef();
  const descriptionUaRef = useRef();
  const [clinic, setClinic] = useState(
    selected && selected.clinicId
      ? {
          clinicId: selected.clinicId,
          clinicName: clinics.find(c => c.clinicId === selected.clinicId).title
        }
      : {}
  );

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
      description: descriptionRef.current.value,
      descriptionRu: descriptionRuRef.current.value,
      descriptionUa: descriptionUaRef.current.value
    };
    if (clinic && clinic.clinicId && clinic.clinicName) {
      data.clinicId = clinic.clinicId;
    }
    else if (selected) {
      data.clinicId = selected.clinicId;
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
              <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  ref={descriptionRef}
                  defaultValue={selected.description}
                />
              </Form.Group>
              <Form.Group id="descriptionRu">
                <Form.Label>Description Ru</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  ref={descriptionRuRef}
                  defaultValue={selected.descriptionRu}
                />
              </Form.Group>
              <Form.Group id="descriptionUa">
                <Form.Label>Description Ua</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  ref={descriptionUaRef}
                  defaultValue={selected.descriptionUa}
                />
              </Form.Group>
              <Form.Group id="clinic" className="mb-5">
                <Form.Label>Clinic</Form.Label>
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
