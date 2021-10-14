import React from "react";
import { Link } from "react-router-dom";
import classes from './MainNavigation.module.css'

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Admin Dashboard</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/clinics">Clinics</Link>
          </li>
          <li>
            <Link to="/clinic-informations">Clinic info</Link>
          </li>
          <li>
            <Link to="/dentists">Dentists</Link>
          </li>
          <li>
            <Link to="/dentist-informations">Dentist info</Link>
          </li>
          <li>
            <Link to="/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/clients">Clients</Link>
          </li>
          <li>
            <Link to="/managers">Managers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
