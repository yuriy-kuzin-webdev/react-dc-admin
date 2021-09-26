import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Dentist({ dentist }) {
  return (
    <tr>
      <td>{dentist.id}</td>
      <td>{dentist.type}</td>
      <td>{dentist.name}</td>
      <td>{dentist.clinicId}</td>
      <td>{dentist.clinicName}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info">View/Edit</Button>
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
