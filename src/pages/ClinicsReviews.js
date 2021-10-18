import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import ClinicReviewList from "../components/ClinicsReviews/ClinicReviewList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";

export default function ClinicsReviews() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(review) {
    context.addClinicReview(review);
    handleCancel();
  }
  function handleUpdate(review) {
    context.updClinicReview(review);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delClinicReview(id);
  }
  function handleModalShow(review) {
    setSelected(review);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(review) {
    setFormText("Edit review");
    setSelected(review);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Add new review");
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
      clients={context.clients.map((c) => {
        return {
          clientId: c.id,
          clientName: c.name,
        };
      })}
    />
  ) : (
    <section>
      <h1>Clinic reviews page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new clinic review
        </Button>
      </div>
      <ClinicReviewList
        reviews={context.clinicReviews}
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

function UserForm({
  selected,
  handleCancel,
  handleSubmit,
  formText,
  clinics,
  clients,
}) {
  const rateRef = useRef();
  const messageRef = useRef();
  const [clinic, setClinic] = useState(
    selected && selected.clinicId
      ? {
          clinicId: selected.clinicId,
          clinicName: clinics.find((c) => c.clinicId === selected.clinicId)
            .title,
        }
      : {}
  );
  const [client, setClient] = useState(
    selected && selected.clientId
      ? {
          clientId: selected.clientId,
          clientName: clients.find((c) => c.clientId === selected.clientId)
            .name,
        }
      : {}
  );

  function handleClinicChange(e) {
    const id = parseInt(e.target.value);
    const selectedClinic = clinics.find((c) => c.clinicId === id);
    setClinic(selectedClinic);
  }
  function handleClientChange(e) {
    const id = parseInt(e.target.value);
    const selectedClient = clients.find((c) => c.clientId === id);
    setClient(selectedClient);
  }
  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      rate: parseInt(rateRef.current.value),
      message: messageRef.current.value,
    };
    if (clinic && clinic.clinicId && clinic.clinicName) {
      data.clinicId = clinic.clinicId;
    } else if (selected) {
      data.clinicId = selected.clinicId;
    }
    if (client && client.clientId && client.clientName) {
      data.clientId = client.clientId;
    } else if (selected) {
      data.clientId = selected.clientId;
    }
    if (selected && selected.id) {
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
              <Form.Group id="rate">
                <Form.Label>Rate (1-5)</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={rateRef}
                  defaultValue={selected.rate}
                />
              </Form.Group>
              <Form.Group id="message">
                <Form.Label>Review text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  ref={messageRef}
                  defaultValue={selected.message}
                />
              </Form.Group>
              <Form.Group id="clinic" className="mb-5">
                <Form.Label>Clinic</Form.Label>
                <Form.Select
                  onChange={handleClinicChange}
                  value={clinic && clinic.clinicId && clinic.clinicId}
                >
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
              <Form.Group id="client" className="mb-5">
                <Form.Label>Client</Form.Label>
                <Form.Select
                  onChange={handleClientChange}
                  value={client && client.clientId && client.clientId}
                >
                  <option>Not selected</option>
                  {clients.map((c) => {
                    return (
                      <option key={c.clientId} value={c.clientId}>
                        {c.clientName}
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
