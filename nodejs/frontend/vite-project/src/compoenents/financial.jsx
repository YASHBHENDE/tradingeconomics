import React, { useState } from 'react'

const Financials = () => {
  const [stock, setStock] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3001/financials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock }),
      })

      if (!res.ok) throw new Error('Failed to fetch data')

      const json = await res.json()
      setData(json.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const convertValue = (val, unit) => {
    if (val == null) return 'N/A'
    let scaled = val
    if (unit === 'E+06') scaled = val * 1_000_000
    else if (unit === 'E+09') scaled = val * 1_000_000_000

    if (scaled >= 1_000_000_000_000) return `${(scaled / 1_000_000_000_000).toFixed(2)}T`
    if (scaled >= 1_000_000_000) return `${(scaled / 1_000_000_000).toFixed(2)}B`
    if (scaled >= 1_000_000) return `${(scaled / 1_000_000).toFixed(2)}M`
    return scaled.toLocaleString()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Financials Viewer</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter stock symbol e.g. aapl:us"
          className="border p-2 flex-1 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <div className="space-y-8">
          {data.map((item, idx) => (
            <div key={idx} className="p-4 border rounded-md bg-gray-50 shadow">
              <h2 className="text-lg font-semibold mb-2 capitalize">{item.financialSymbol.replace(/-/g, ' ')}</h2>
              <p className="mb-2 text-sm text-gray-700">
               
                
              </p>

              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => {
                    const date = item[`date${i}`]
                    const value = item[`value${i}`]
                    if (!date || value == null) return null
                    return (
                      <tr key={i}>
                        <td className="border p-2">{new Date(date).toLocaleDateString()}</td>
                        <td className="border p-2">
                          {convertValue(value, item.unit)} {item.currency || ''}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Financials
