export async function GivenEndpoint(query) {
  

  const url = `https://brains.tradingeconomics.com/v2/search/wb,fred,comtrade?q=${query}&pp=50&p=0&_=1557934352427&stance=2`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch Error:', error.message)
    throw error
  }
}
