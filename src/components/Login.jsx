import { useCallback, useEffect, useState } from "react"
import ValidationForPassword from './ValidationForPassword'
import { auth, db } from '../firebase'
import { withRouter } from "react-router-dom"



const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [validation, setValidation] = useState(false)
    const [message, setMessage] = useState('')

    const [esRegistro, setEsRegistro] = useState(props.register)

    useEffect(() => {
        if (auth.currentUser) {
            props.history.push('/admin')
        } 
    }, [])

    const procesarDatos = (e) => {

        e.preventDefault();


        if (esRegistro) {
            registrar()
        } else {
            login()
        }

    }

    const login = useCallback(async () => {

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)


            props.history.push('/admin')

        } catch (error) {
            setMessage(error.message)
            setValidation(true)
            setEmail('')
            setPass('')

        }


    }, [email, pass, props.history])

    const registrar = useCallback(async () => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            await db.collection(res.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
            })
            setValidation(false)
            props.history.push('/admin')


        } catch (error) {
            setValidation(true)
            setEmail('')
            setPass('')

            setMessage(error.message)

        }


    }, [email, pass, props.history])



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{esRegistro ? 'Register' : 'Login'}</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <button onClick={() => (setEsRegistro(!esRegistro), setValidation(false))} className="font-medium text-indigo-600 hover:text-indigo-500">
                        {esRegistro ? 'login to your account' : 'start your free account'}
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={procesarDatos}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    placeholder="Enter your email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}

                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    placeholder="Enter your password"
                                    type="password"
                                    autoComplete="current-password"

                                    onChange={e => setPass(e.target.value)}
                                    value={pass}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {validation && <ValidationForPassword message={message} />}
                        </div>
                        {!esRegistro &&
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />


                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>

                                </div>


                            </div>
                        }
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {esRegistro ? 'Sign in' : 'Login'}
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)



