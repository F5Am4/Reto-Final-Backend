require('dotenv').config()

const server = require('./src/server')
const db = require('./src/lib/db')

const port = process.env.PORT || 8080

db.connect().then(() => {
    console.log('DB connected');

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})
    .catch((error) => {
        console.error('Error connecting to DB:', error);
        process.exit(1);
    })

