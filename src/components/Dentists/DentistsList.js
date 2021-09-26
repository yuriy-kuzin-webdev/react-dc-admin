import React from "react";
import Dentist from "./Dentist";
import Table from "react-bootstrap/Table";

export default function DentistsList({ dentists }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Name</th>
          <th>Clinic Id</th>
          <th>Clinic Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dentists.map((dentist) => (
          <Dentist key={dentist.id} dentist={dentist} />
        ))}
      </tbody>
    </Table>
  );
}
