import { Route, Switch } from "react-router-dom";
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import Clinics from './pages/Clinics';
import Dentists from './pages/Dentists';
import Managers from './pages/Managers';
import Layout from "./components/Layout/Layout";
import ClinicInformations from "./pages/ClinicInformations";
import DentistInformations from "./pages/DentistInformations";
import ClinicsReviews from "./pages/ClinicsReviews";
import DentistsReviews from "./pages/DentistsReviews";


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/appointments">
          <Appointments/>
        </Route>
        <Route path="/clients">
          <Clients/>
        </Route>
        <Route path="/clinics" exact>
          <Clinics/>
        </Route>
        <Route path="/clinics-reviews">
          <ClinicsReviews/>
        </Route>
        <Route path="/clinic-informations">
          <ClinicInformations/>
        </Route>
        <Route path="/dentists" exact>
          <Dentists/>
        </Route>
        <Route path="/dentists-reviews">
          <DentistsReviews/>
        </Route>
        <Route path="/dentist-informations">
          <DentistInformations/>
        </Route>
        <Route path="/managers">
          <Managers/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
