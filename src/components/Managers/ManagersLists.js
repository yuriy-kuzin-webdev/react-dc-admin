import React from "react";
import Manager from "./Manager";
import Table from "react-bootstrap/Table";

export default function ManagersLists({ managers }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Clinic id</th>
          <th>User Name</th>
          <th>User Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {managers.map((manager) => (
          <Manager key={manager.id} manager={manager} />
        ))}
      </tbody>
    </Table>
  );
}
