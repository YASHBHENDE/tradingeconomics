import React from 'react' 

import { useNavigate } from "react-router-dom"

export function Index() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center gap-4 m-5">
      <button
        onClick={() => navigate('/news')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        News
      </button>
      <button
        onClick={() => navigate('/financials')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Financials
      </button>
    </div>
  )
}
