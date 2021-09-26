import React, { useContext } from "react";
import DcContext from "../store/dc-context";
import ManagersList from "../components/Managers/ManagersLists";
import Button from "react-bootstrap/Button";

export default function Managers() {
  const context = useContext(DcContext);

  function handleCreate(manager){}
  function handleDelete(id){}
  function handleUpdate(manager){}
  function handleModalShow(id){}
  function handleCancel(){}
  return (
    <section>
      <h1>Managers page</h1>
      <div className="mb-3 mt-5">
        <Button variant="primary">Register New Manager</Button>
      </div>
      <ManagersList managers={context.managers} />
    </section>
  );
}
