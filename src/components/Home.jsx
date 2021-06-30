import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

const Home = () => {

    const [firebaseUser, setFirebaseUser] = useState(false)


    useEffect(() => {
     auth.onAuthStateChanged(user => {
      if(user) {setFirebaseUser(user)}
      else{setFirebaseUser(user)}
     })
    }, [])
    return (
        <div className="relative bg-gray-50">
        <main className="lg:h-5/6">
          <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Tus tareas...</span>{' '}
                <span className="block text-indigo-600 xl:inline">en cualquier lugar o dispositivo</span>
              </h1>


              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to= { firebaseUser ? "/admin" : "/login"   }
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Comenzar
                  </Link>
                </div>

              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.metmuseum.org/CRDImages/ad/web-large/L.2009.22.136.jpg"
              alt=""
            />
          </div>
        </main>
      </div>
    )
}

export default Home
