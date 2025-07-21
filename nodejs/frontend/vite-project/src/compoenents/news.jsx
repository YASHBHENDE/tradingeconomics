import axios from "axios"
import React from 'react' 
import { useEffect, useState } from "react"


export function News() {
  const [news, setNews] = useState([])

  async function GetNews() {
    try {
      const response = await axios.get("http://localhost:3001/news")
      setNews(response.data.news)
    } catch (error) {
      console.error("Error fetching news:", error)
    }
  }

  useEffect(() => {
    GetNews()
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Latest Financial News</h1>
      {!news || news.length === 0 ? (
        <p className="text-center text-gray-500">Loading news...</p>) : (
        news.map((item) => <NewsCard key={item.id} {...item} />)
        )}

    </div>
  )
}


function NewsCard({ id, title, date, description, country, category, symbol, url, importance }) {
  return (
    <div
      key={id}
      className="bg-white shadow-md rounded-xl p-5 border border-gray-200 transition hover:shadow-lg"
    >
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      <div className="text-sm text-gray-500 mb-2">
        <span>{new Date(date).toLocaleString()}</span> &bull; <span>{country}</span>
      </div>
      <p className="text-gray-700 mb-3 line-clamp-4">{description}</p>
      <div className="flex flex-wrap justify-between text-xs text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded">{category}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{symbol}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Importance: {importance}</span>
        <a
          href={`https://tradingeconomics.com${url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read more 
        </a>
      </div>
    </div>
  )
}