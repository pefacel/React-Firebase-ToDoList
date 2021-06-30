import React, { useEffect, useState } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from '../firebase'
 



const Navbar = (props ) => {
    const [firebaseUser, setFirebaseUser] = useState(false)


    useEffect(() => {
     auth.onAuthStateChanged(user => {
      if(user) {setFirebaseUser(user)}
      else{setFirebaseUser(user)}
     })
    }, [])
    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <header className="bg-indigo-600">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <Link to="/">
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-10 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                alt=""
                            />
                        </Link>
                        <div className="hidden ml-10 space-x-8 lg:block">




                            {firebaseUser &&
                            
                                    <NavLink exact to={'/admin'}
                                        className="text-base font-large text-white hover:text-indigo-50" activeClassName="text-lg font-medium text-white hover:text-indigo-50"
                                    >Tus tareas</NavLink>
                  
               
                            }






                        </div>
                    </div>
                    <div className="ml-10 space-x-4">


                        {firebaseUser ? <>

                            <button  onClick={() => cerrarSesion()} className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                                Logout </button></>
                            :
                            (

                                <Link to={'/login'} className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                                    Login </Link>


                            )

                        }
                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">

                    {//<Link to={'/'} className="text-base font-medium text-white hover:text-indigo-50" >Inicio</Link>
                    }
                    {//firebaseUser && <Link to={'/admin'} className="text-base font-medium text-white hover:text-indigo-50" >Admin</Link>
                    }




                </div>
            </nav>
        </header>
    )
}

export default withRouter(Navbar)
