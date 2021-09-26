import React, { useContext } from 'react'
import DcContext from '../store/dc-context'
import ClinicsList from '../components/Clinics/ClinicsList'

export default function Clinics() {
    const context = useContext(DcContext)
    return (
        <section>
            <h1>Clinics page</h1>
            <ClinicsList clinics={context.clinics}/>
        </section>
    )
}
