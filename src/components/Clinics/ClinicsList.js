import React from "react";
import Clinic from "./Clinic";
import Table from "react-bootstrap/Table";

export default function ClinicsList({ clinics, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>District</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clinics.map((clinic) => (
          <Clinic key={clinic.id} clinic={clinic} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
