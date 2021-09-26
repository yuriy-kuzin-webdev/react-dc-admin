import React, { useContext } from 'react'
import DcContext from '../store/dc-context'
import ClientsList from '../components/Clients/ClientsList'

export default function Clients() {
    const context = useContext(DcContext)
    return (
        <section>
            <h1>Clients page</h1>
            <ClientsList clients={context.clients}/>
        </section>
    )
}
