import React from "react";
import Dentist from "./Dentist";
import Table from "react-bootstrap/Table";

export default function DentistsList({ dentists, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Name</th>
          <th>Clinic Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dentists.map((dentist) => (
          <Dentist key={dentist.id} dentist={dentist} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
