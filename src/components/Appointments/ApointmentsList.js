import React from "react";
import Appointment from "./Appointment";
import Table from "react-bootstrap/Table";

export default function ApointmentsList({ appointments }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Dentist id</th>
          <th>Date</th>
          <th>Client id</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} appointment={appointment} />
        ))}
      </tbody>
    </Table>
  );
}
