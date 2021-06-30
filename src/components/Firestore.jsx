import React, { useEffect, useState } from 'react'
import { firebase } from '../firebase'


const Firestore = (props) => {


    const [tareas, setTareas] = useState([])
    const [tarea, setTarea] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')





    useEffect(() => {

        const obtenerDatos = async () => {

            try {
                const db = firebase.firestore()
                const data = await db.collection(props.user.uid).get()
                const arrayData = data.docs.map(doc => ({ id: doc.id, fecha: doc.fecha, ...doc.data() }))
                setTareas(arrayData)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos()

    }, [])

    const agregar = async (e) => {
        e.preventDefault();

        if (!tarea.trim()) {
            console.log('elemento vacio')
            return
        }


        try {
            const db = firebase.firestore()
            const nuevaTarea = {
                name: tarea,
                fecha: new Date(Date.now()).toLocaleString()
            }


            const data = await db.collection(props.user.uid).add(nuevaTarea)

            setTareas([
                ...tareas,
                {
                    ...nuevaTarea, id: data.id
                }
            ])

            reset()

        } catch (error) {
            console.log(error)

        }


    }

    const eliminar = async (id) => {

        try {
            const db = firebase.firestore()
            await db.collection(props.user.uid).doc(id).delete()
            const arrayFiltrado = tareas.filter(item => item.id !== id)
            setTareas(arrayFiltrado)
        } catch (error) {
            console.log(error)
        }


    }

    const activarEdicion = (tarea) => {

        setModoEdicion(true)
        setTarea(tarea.name)
        setId(tarea.id)

    }


    const editar = async (e) => {
        e.preventDefault();

        if (!tarea.trim()) {
            console.log('elemento vacio')
            return
        }


        try {
            const db = firebase.firestore()
            await db.collection(props.user.uid).doc(id).update({
                name: tarea
            })
            const arrayEditado = tareas.map(item => (
                item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
            ))
            setTareas(arrayEditado)
            reset()

        } catch (error) {
            console.log(error)

        }




    }

    const reset = () => {
        setTarea('')
        setId('')
        setModoEdicion(false)
    }



    return (
        <>
            <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">



                <div className="my-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}</h2>

                </div>

                <div className="my-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={modoEdicion ? editar : agregar}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tarea
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        placeholder="Ingrese tarea"
                                        onChange={e => setTarea(e.target.value)}
                                        value={tarea}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"

                                    className={
                                        modoEdicion ?
                                            "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            :
                                            "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                    }
                                >
                                    {modoEdicion ? 'Editar' : 'Agregar'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Date
                                            </th>

           
                                            <th scope="col" className="relative px-6 py-3">        </th>
                                            <th scope="col" className="relative px-6 py-3">        </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tareas.map((tarea) => (
                                            <tr key={tarea.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tarea.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tarea.fecha}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <p onClick={() => eliminar(tarea.id)} className="text-red-600 hover:text-red-900 cursor-pointer">Eliminar </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <p onClick={() => activarEdicion(tarea)} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">Edit </p>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



        </>
    )

}

export default Firestore
