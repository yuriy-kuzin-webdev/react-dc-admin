import React, { useContext } from 'react'
import DcContext from '../store/dc-context'
import DentistsList from '../components/Dentists/DentistsList'

export default function Dentists() {
    const context = useContext(DcContext)
    return (
        <section>
            <h1>Dentists page</h1>
            <DentistsList dentists={context.dentists}/>
        </section>
    )
}
