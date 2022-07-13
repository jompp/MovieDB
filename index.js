const express = require('express')
const app = express()
const fetch = require('cross-fetch');
const port = 3000

app.use(express.static('public'))

app.get('/api/:pag',  async (req,res)=> {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&language=pt-BR&page=${req.params.pag}`)
  const data = await response.json()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})