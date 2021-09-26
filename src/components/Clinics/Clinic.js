import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Clinic({ clinic }) {
  return (
    <tr>
      <td>{clinic.id}</td>
      <td>{clinic.title}</td>
      <td>{clinic.district}</td>
      <td>{clinic.address}</td>
      <td>{clinic.phone}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info">View/Edit</Button>
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
