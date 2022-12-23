import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function DentistReview({ review, onDelete, onEdit }) {
  function handleDelete(e){
    onDelete(review)
    e.preventDefault()
  }
  function handleEdit(e) {
    onEdit(review)
    e.preventDefault()
  }
  return (
    <tr>
      <td>{review.id}</td>
      <td>{review.rate}</td>
      <td>{review.message}</td>
      <td>{review.clientId}</td>
      <td>{review.dentistId}</td>
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
