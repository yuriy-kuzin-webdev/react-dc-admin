import { createContext, useEffect, useState } from "react";

const DcContext = createContext({
  language: 0,

  appointments: [],
  clients: [],
  clinics: [],
  clinicInformations: [],
  clinicReviews: [],
  dentists: [],
  dentistInformations: [],
  dentistReviews: [],
  managers: [],

  changeLanguage: (code) => {},

  addAppointment: (appointment) => {},
  updAppointment: (appointment) => {},
  delAppointment: (appointmentId) => {},

  addClient: (client) => {},
  updClient: (client) => {},
  delClient: (clientId) => {},

  addClinic: (clinic) => {},
  updClinic: (clinic) => {},
  delClinic: (clinicId) => {},

  addClinicInformation: (clinicInfo) => {},
  updClinicInformation: (clinicInfo) => {},
  delClinicInformation: (clinicInfoId) => {},

  addClinicReview: (clinicReview) => {},
  updClinicReview: (clinicReview) => {},
  delClinicReview: (clinicReviewId) => {},

  addDentist: (dentist) => {},
  updDentist: (dentist) => {},
  delDentist: (dentistId) => {},

  addDentistInformation: (dentistInformation) => {},
  updDentistInformation: (dentistInformation) => {},
  delDentistInformation: (dentistInformationId) => {},

  addDentistReview: (dentistReview) => {},
  updDentistReview: (dentistReview) => {},
  delDentistReview: (dentistReviewId) => {},

  addManager: (manager) => {},
  updManager: (manager) => {},
  delManager: (managerId) => {},
});

export function DcContextProvider(props) {
  const api = "http://localhost:31437/api/";

  const [userLanguage, setUserLanguage] = useState(0);
  const [userAppointments, setUserAppointments] = useState([]);
  const [userClients, setUserClients] = useState([]);
  const [userClinics, setUserClinics] = useState([]);
  const [userClinicInformations, setUserClinicInformations] = useState([]);
  const [userClinicReviews, setUserClinicReviews] = useState([]);
  const [userDentists, setUserDentists] = useState([]);
  const [userDentistInformations, setUserDentistInformations] = useState([]);
  const [userDentistReviews, setUserDentistReviews] = useState([]);
  const [userManagers, setUserManagers] = useState([]);

  useEffect(() => {
    async function fetchData(setStateCallback, controllerName) {
      let response = await fetch(api + controllerName);
      let data = await response.json();
      setStateCallback(data);
    }
    fetchData(setUserAppointments, "appointments");
    fetchData(setUserClients, "clients");
    fetchData(setUserClinics, "clinics");
    fetchData(setUserClinicInformations, "clinicinfoes");
    fetchData(setUserClinicReviews, "clinicreviews");
    fetchData(setUserDentists, "dentists");
    fetchData(setUserDentistInformations, "dentistinfoes");
    fetchData(setUserDentistReviews, "dentistreviews");
    fetchData(setUserManagers, "managers");
  }, []);

  function changeLanguageHandler(code) {
    setUserLanguage(code);
  }

  function addData(data, controllerName, setStateCallback) {
    fetch(api + controllerName, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setStateCallback((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updData(data, dataId, controllerName, setStateCallback) {
    fetch(api + controllerName + "/" + dataId, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setStateCallback((prev) => {
        return prev.map((d) => {
          return d[Object.keys(d)[0]] === dataId ? data : d;
        });
      });
    });
  }
  function delData(dataId, controllerName, setStateCallback) {
    fetch(api + controllerName + "/" + dataId, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setStateCallback((prev) => {
          return prev.filter((data) => data[Object.keys(data)[0]] !== dataId);
        });
      });
  }

  const context = {
    language: userLanguage,
    appointments: userAppointments,
    clients: userClients,
    clinics: userClinics,
    clinicInformations: userClinicInformations,
    clinicReviews: userClinicReviews,
    dentists: userDentists,
    dentistInformations: userDentistInformations,
    dentistReviews: userDentistReviews,
    managers: userManagers,

    changeLanguage: changeLanguageHandler,

    addAppointment: (appointment) => { addData(appointment, "appointments", setUserAppointments) },
    updAppointment: (appointment) => { updData(appointment, appointment.id, "appointments", setUserAppointments) },
    delAppointment: (appointmentId) => { delData(appointmentId, "appointments", setUserAppointments) },

    addClient: (client) => { addData(client, "clients", setUserClients) },
    updClient: (client) => { updData(client, client.id, "clients", setUserClients) },
    delClient: (clientId) => { delData(clientId, "clients", setUserClients) },

    addClinic: (clinic) => { addData(clinic, "clinics", setUserClinics) },
    updClinic: (clinic) => { updData(clinic, clinic.id, "clinics", setUserClinics) },
    delClinic: (clinicId) => { delData(clinicId, "clinics", setUserClinics) },

    addClinicInformation: (clinicInfo) => { addData(clinicInfo, "clinicinfoes", setUserClinicInformations) },
    updClinicInformation: (clinicInfo) => { updData(clinicInfo, clinicInfo.clinicId, "clinicinfoes", setUserClinicInformations) },
    delClinicInformation: (clinicInfoId) => { delData(clinicInfoId, "clinicinfoes", setUserClinicInformations) },

    addClinicReview: (clinicReview) => { addData(clinicReview, "clinicreviews", setUserClinicReviews) },
    updClinicReview: (clinicReview) => { updData(clinicReview, clinicReview.id ,"clinicreviews", setUserClinicReviews) },
    delClinicReview: (clinicReviewId) => { delData(clinicReviewId, "clinicreviews", setUserClinicReviews) },

    addDentist: (dentist) => { addData(dentist, "dentists", setUserDentists) },
    updDentist: (dentist) => { updData(dentist, dentist.id, "dentists", setUserDentists) },
    delDentist: (dentistId) => { delData(dentistId, "dentists", setUserDentists) },

    addDentistInformation: (dentistInformation) => { addData(dentistInformation, "dentistinfoes", setUserDentistInformations) },
    updDentistInformation: (dentistInformation) => { updData(dentistInformation, dentistInformation.dentistId, "dentistinfoes", setUserDentistInformations) },
    delDentistInformation: (dentistInformationId) => { delData(dentistInformationId, "dentistinfoes", setUserDentistInformations) },

    addDentistReview: (dentistReview) => { addData(dentistReview, "dentistreviews", setUserDentistReviews) },
    updDentistReview: (dentistReview) => { updData(dentistReview, dentistReview.id, "dentistreviews", setUserDentistReviews) },
    delDentistReview: (dentistReviewId) => { delData(dentistReviewId, "dentistreviews", setUserDentistReviews) },

    addManager: (manager) => { addData(manager, "managers", setUserManagers) },
    updManager: (manager) => { updData(manager, manager.id, "managers", setUserManagers) },
    delManager: (managerId) => { delData(managerId, "managers", setUserManagers) },
  };

  return (
    <DcContext.Provider value={context}>{props.children}</DcContext.Provider>
  );
}

export default DcContext;
