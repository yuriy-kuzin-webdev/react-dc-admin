import React, { useContext, useState, useRef } from "react";
import DcContext from "../store/dc-context";
import AppointmentsList from "../components/Appointments/ApointmentsList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import Modal from "../components/Modal";
import Backdrop from "../components/Backdrop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function Appointments() {
  const context = useContext(DcContext);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formText, setFormText] = useState("");
  const [submitHandle, setSubmitHandle] = useState({ onSubmit: () => {} });
  const [selected, setSelected] = useState({});

  function handleCreate(appointment) {
    context.addAppointment(appointment);
    handleCancel();
  }
  function handleUpdate(appointment) {
    context.updAppointment(appointment);
    handleCancel();
  }
  function handleDelete() {
    const id = selected.id;
    handleCancel();
    context.delAppointment(id);
  }
  function handleModalShow(appointment) {
    setSelected(appointment);
    setIsModalActive(true);
  }
  function handleCancel() {
    setSelected({});
    setIsModalActive(false);
    setIsFormActive(false);
  }
  function handleFormEdit(appointment) {
    setFormText("Edit appointment");
    setSelected(appointment);
    setSubmitHandle({
      onSubmit: handleUpdate,
    });
    setIsFormActive(true);
  }
  function handleFormCreate() {
    setFormText("Add new appointment");
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
      <h1>Appointments Informations page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary" onClick={handleFormCreate}>
          Add new appointment
        </Button>
      </div>
      <AppointmentsList
        appointments={context.appointments}
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
  const statusRef = useRef();
  const clientIdRef = useRef();
  const clinicIdRef = useRef();
  const dentistIdRef = useRef();
  let initialDate = new Date();
  initialDate.setHours(0,0,0,0);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  function handleDateChange(date) {
      setSelectedDate(date);
  }

  function handleCancelUserForm(e) {
    e.preventDefault();
    handleCancel();
  }
  function handleSubmitUserForm(e) {
    e.preventDefault();
    let data = {
      dentistId: parseInt(dentistIdRef.current.value),
      clinicId: parseInt(clinicIdRef.current.value),
      date: selectedDate.toISOString(),
      clientId: parseInt(clientIdRef.current.value),
      status: parseInt(statusRef.current.value),
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
            <Form.Group id="dentistId">
                <Form.Label>Dentist Id</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={dentistIdRef}
                  defaultValue={selected.dentistId}
                />
              </Form.Group>
              <Form.Group id="clinicId">
                <Form.Label>Clinic Id</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={clinicIdRef}
                  defaultValue={selected.clinicId}
                />
              </Form.Group>
              <Form.Group id="clientId">
                <Form.Label>Client Id</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={clientIdRef}
                  defaultValue={selected.clientId}
                />
              </Form.Group>
              <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  required
                  ref={statusRef}
                  defaultValue={selected.status}
                />
              </Form.Group>
              <Form.Group id="date" className="mb-5">
                <Form.Label>Date</Form.Label>
                <DatePicker selected={selectedDate} onChange={handleDateChange}/>
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
