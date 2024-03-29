import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Client({ client, onDelete, onEdit }) {
  function handleDelete(e) {
    onDelete(client);
    e.preventDefault();
  }
  function handleEdit(e) {
    onEdit(client);
    e.preventDefault();
  }
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
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
