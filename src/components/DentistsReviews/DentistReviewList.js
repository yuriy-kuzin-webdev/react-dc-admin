import React from "react";
import DentistReview from "./DentistReview";
import Table from "react-bootstrap/Table";

export default function DentistReviewList({ reviews, onDelete, onEdit  }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Rate</th>
          <th>Message</th>
          <th>Client id</th>
          <th>Dentist id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <DentistReview key={review.id} review={review} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </Table>
  );
}
