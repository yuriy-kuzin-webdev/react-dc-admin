import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Appointment({ appointment }) {
  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{appointment.dentistId}</td>
      <td>{appointment.date}</td>
      <td>{appointment.clientId}</td>
      <td>{appointment.status}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info">View/Edit</Button>
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
