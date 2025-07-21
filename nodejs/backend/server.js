import express from "express"
import te from "tradingeconomics"
import { NewsExample } from "./news.js"
import { GetFinancial } from "./financials.js"
import { apiKey } from "./config.js"
import cors from "cors"
import { GivenEndpoint } from "./givenEndpoint.js"


const app = express()
app.use(cors())
app.use(express.json())

app.get('/news',async (req,res)=>{
    const news = await NewsExample()

    res.json({
        "news":news
    })
    
})


app.post('/search', async (req, res) => {

    const {query} = req.body
    console.log(query)
    te.login(apiKey);
    data = te.getSearch(term = query, category = 'markets').then(function(data){
        console.log(data)     
    });
});

app.post('/financials',async(req,res)=>{
    const {stock} = req.body

    const data = await GetFinancial(stock)

    res.json({data})

})

app.post("/GivenEndPoint", async (req, res) => {
  const { country } = req.body
  console.log("Received country:", country)
  try {
    const data = await GivenEndpoint(country)
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.listen(3001,()=>{
    
    console.log("listening on port 3001")
})