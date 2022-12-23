import React from "react";
import DentistInformation from "./DentistInformation";
import Table from "react-bootstrap/Table";

export default function DentistInformationList({ informations, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Dentist Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {informations.map((info) => (
          <DentistInformation key={info.dentistId} info={info} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
