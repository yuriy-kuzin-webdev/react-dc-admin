import React, { useContext } from 'react'
import DcContext from '../store/dc-context'
import AppointmentsList from '../components/Appointments/ApointmentsList'

export default function Appointments() {
    const context = useContext(DcContext)
    return (
        <section>
            <h1>Appointments page</h1>
            <AppointmentsList appointments={context.appointments}/>
        </section>
    )
}
