import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import DentistInformationList from "../components/DentistInformations/DentistInformationList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

export default function DentistInformations() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(info) {
    context.addDentistInformation(info);
    handleCancel();
  }
  function handleUpdate(info) {
    context.updDentistInformation(info);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.dentistId;
    handleCancel();
    context.delDentistInformation(id);
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
      dentists={context.dentists.map((d) => {
        return {
          dentistId: d.id,
          dentistName: d.name,
        };
      })}
    />
  ) : (
    <section>
      <h1>Dentist Informations page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new info
        </Button>
      </div>
      <DentistInformationList
        informations={context.dentistInformations}
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

function UserForm({ selected, handleCancel, handleSubmit, formText, dentists }) {
  const descriptionRef = useRef();
  const descriptionRuRef = useRef();
  const descriptionUaRef = useRef();
  const [dentist, setDentist] = useState(
    selected && selected.dentistId
      ? {
          dentistId: selected.dentistId,
          dentistName: dentists.find(d => d.dentistId === selected.dentistId).name
        }
      : {}
  );

  function handleDentistChange(e) {
    const id = parseInt(e.target.value);
    const selectedDentist = dentists.find((d) => d.dentistId === id);
    console.log(selectedDentist);
    setDentist(selectedDentist);
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
    if (dentist && dentist.dentistId && dentist.dentistName) {
      data.dentistId = dentist.dentistId;
    }
    else if (selected) {
      data.dentistId = selected.dentistId;
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
              <Form.Group id="dentist" className="mb-5">
                <Form.Label>Dentist</Form.Label>
                <Form.Select onChange={handleDentistChange}
                value={(dentist && dentist.dentistId) && dentist.dentistId}>
                  <option>Not selected</option>
                  {dentists.map((d) => {
                    return (
                      <option key={d.dentistId} value={d.dentistId}>
                        {d.dentistName}
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
