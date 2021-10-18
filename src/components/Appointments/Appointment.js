import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Appointment({ appointment, onDelete, onEdit }) {
  function handleDelete(e) {
    onDelete(appointment);
    e.preventDefault();
  }
  function handleEdit(e) {
    onEdit(appointment);
    e.preventDefault();
  }
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{appointment.dentistId}</td>
      <td>{appointment.clinicId}</td>
      <td>{appointment.date}</td>
      <td>{appointment.clientId}</td>
      <td>{appointment.status}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info" onClick={handleEdit}>
            View/Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
