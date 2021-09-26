import React from "react";
import Table from "react-bootstrap/Table";
import Client from "./Client";

export default function ClientsList({ clients }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </tbody>
    </Table>
  );
}
