import React from 'react'
import { XCircleIcon } from '@heroicons/react/solid'



const ValidationForPassword = ({message}) => {

  return (
    <div className="rounded-md bg-red-50 p-3 mt-2">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <div className="text-sm text-red-700">
            <h1>{message}</h1>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ValidationForPassword

