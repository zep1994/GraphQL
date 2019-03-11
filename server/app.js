const express = require('express')
const graphHTTP = require('express-graphql')

const app = express()

app.use('/graphql', graphHTTP({
    
}))

app.listen(4000, () => {
    console.log("now listenign on port 4000")
})