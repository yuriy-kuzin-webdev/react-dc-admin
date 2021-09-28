import { createContext, useEffect, useState } from "react";

const DcContext = createContext({
  appointments: [],
  clients: [],
  clinics: [],
  dentists: [],
  managers: [],

  addDentist: (dentist) => {},
  updDentist: (dentist) => {},
  delDentist: (dentistId) => {},

  addManager: (manager) => {},
  updManager: (manager) => {},
  delManager: (managerId) => {},

  addClinic: (clinic) => {},
  updClinic: (clinic) => {},
  delClinic: (clinicId) => {},
});

export function DcContextProvider(props) {
  const api = "https://localhost:44328/api/";

  const [userAppointments, setUserAppointments] = useState([]);
  const [userClients, setUserClients] = useState([]);
  const [userClinics, setUserClinics] = useState([]);
  const [userDentists, setUserDentists] = useState([]);
  const [userManagers, setUserManagers] = useState([]);

  useEffect(() => {
    async function fetchClinics() {
      let clinics = await fetch(api + "clinics");
      clinics = await clinics.json();
      setUserClinics(clinics);
    }
    async function fetchClients() {
      let clients = await fetch(api + "clients");
      clients = await clients.json();
      setUserClients(clients);
    }
    async function fetchAppointments() {
      let appointments = await fetch(api + "appointments");
      appointments = await appointments.json();
      setUserAppointments(appointments);
    }
    async function fetchDentists() {
      let dentists = await fetch(api + "dentists");
      dentists = await dentists.json();
      setUserDentists(dentists);
    }
    async function fetchManagers() {
      let managers = await fetch(api + "managers");
      managers = await managers.json();
      setUserManagers(managers);
    }
    fetchAppointments();
    fetchClients();
    fetchClinics();
    fetchDentists();
    fetchManagers();
  }, []);

  function addClinicHandler(clinic) {
    fetch(api + "clinics", {
      method: "POST",
      body: JSON.stringify(clinic),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserClinics((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updClinicHandler(clinic) {
    fetch(api + "clinics/" + clinic.id, {
      method: "PUT",
      body: JSON.stringify(clinic),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserClinics((prev) => {
        return prev.map((c) => {
          return c.id === clinic.id ? clinic : c;
        });
      });
    });
  }
  function delClinicHandler(clinicId) {
    fetch(api + "clinics/" + clinicId, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserClinics((prev) => {
          return prev.filter((clinic) => clinic.id !== clinicId);
        });
      });
  }

  function addDentistHandler(dentist) {
    fetch(api + "dentists", {
      method: "POST",
      body: JSON.stringify(dentist),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserDentists((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updDentistHandler(dentist) {
    fetch(api + "dentists/" + dentist.id, {
      method: "PUT",
      body: JSON.stringify(dentist),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserDentists((prev) => {
        return prev.map((d) => {
          return d.id === dentist.id ? dentist : d;
        });
      });
    });
  }
  function delDentistHandler(dentistId) {
    fetch(api + "dentists/" + dentistId, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserDentists((prev) => {
          return prev.filter((dentist) => dentist.id !== dentistId);
        });
      });
  }

  function addManagerHandler(manager) {
    fetch(api + "managers", {
      method: "POST",
      body: JSON.stringify(manager),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserManagers((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updManagerHandler(manager) {
    fetch(api + "managers/" + manager.id, {
      method: "PUT",
      body: JSON.stringify(manager),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserManagers((prev) => {
        return prev.map((m) => {
          return m.id === manager.id ? manager : m;
        });
      });
    });
  }
  function delManagerHandler(managerId) {
    fetch(api + "managers/" + managerId, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserManagers((prev) => {
          return prev.filter((manager) => manager.id !== managerId);
        });
      });
  }

  const context = {
    appointments: userAppointments,
    clients: userClients,
    clinics: userClinics,
    dentists: userDentists,
    managers: userManagers,

    addDentist: addDentistHandler,
    updDentist: updDentistHandler,
    delDentist: delDentistHandler,

    addManager: addManagerHandler,
    updManager: updManagerHandler,
    delManager: delManagerHandler,

    addClinic: addClinicHandler,
    updClinic: updClinicHandler,
    delClinic: delClinicHandler,
  };

  return (
    <DcContext.Provider value={context}>{props.children}</DcContext.Provider>
  );
}

export default DcContext;
