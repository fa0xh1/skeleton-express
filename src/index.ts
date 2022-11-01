import express from 'express'

function main() {
  const app = express()
  const port = 3000

  app.get('/', (req, res) => res.send('Express skeleton'))
  app.listen(port, () => {
    console.log(`[server] server dimulai di http://localhost:${port} ⚡`)
  })
}

main()
