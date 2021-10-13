import React from "react";
import ClinicInformation from "./ClinicInformation";
import Table from "react-bootstrap/Table";

export default function ClinicInformationList({ informations, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Clinic Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {informations.map((info) => (
          <ClinicInformation key={info.clinicId} info={info} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
