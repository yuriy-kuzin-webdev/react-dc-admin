import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function DentistInformation({ info, onDelete, onEdit }) {
  function handleDelete(e){
    onDelete(info)
    e.preventDefault()
  }
  function handleEdit(e) {
    onEdit(info)
    e.preventDefault()
  }
  return (
    <tr>
      <td>{info.description}</td>
      <td>{info.dentistId}</td>
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
