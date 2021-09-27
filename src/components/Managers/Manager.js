import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Manager({ manager, onDelete, onEdit }) {
  function handleDelete(e){
    onDelete(manager)
    e.preventDefault()
  }
  function handleEdit(e) {
    onEdit(manager)
    e.preventDefault()
  }
  return (
    <tr>
      <td>{manager.id}</td>
      <td>{manager.clinicId}</td>
      <td>{manager.username}</td>
      <td>{manager.password}</td>
      <td width="10%">
        <ButtonGroup>
          <Button variant="info" onClick={handleEdit}>View/Edit</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  );
}
