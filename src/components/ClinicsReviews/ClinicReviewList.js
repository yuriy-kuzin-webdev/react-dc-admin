import React from "react";
import ClinicReview from "./ClinicReview";
import Table from "react-bootstrap/Table";

export default function ClinicReviewList({ reviews, onDelete, onEdit  }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Rate</th>
          <th>Message</th>
          <th>Client id</th>
          <th>Clinic id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <ClinicReview key={review.id} review={review} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
