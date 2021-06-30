import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'
import Firestore from './Firestore'

const Admin = (props) => {


    const [user, setUser] = useState(null)

    useEffect(() => {
        if (auth.currentUser) {
            console.log('existe')
            setUser(auth.currentUser)
        } else {
            console.log('no existe')
            props.history.push('/login')
        }
    }, [])



    return (
        <div>
{
    user &&
    <Firestore user={user} />
}
        </div>
    )
}

export default withRouter(Admin)
