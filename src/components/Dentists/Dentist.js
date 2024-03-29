import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const type = ['', 'dentist', 'surgeon'];

export default function Dentist({ dentist, onDelete, onEdit }) {
  function handleDelete(e){
    onDelete(dentist)
    e.preventDefault()
  }
  function handleEdit(e) {
    onEdit(dentist)
    e.preventDefault()
  }
  return (
    <tr>
      <td>{dentist.id}</td>
      <td>{type[dentist.type]}</td>
      <td>{dentist.name}</td>
      <td>{dentist.clinicId}</td>
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
