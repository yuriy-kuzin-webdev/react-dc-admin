import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Manager({ manager }) {
  return (
    <tr>
      <td>{manager.id}</td>
      <td>{manager.clinicId}</td>
      <td>{manager.username}</td>
      <td>{manager.password}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info">View/Edit</Button>
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
