const sql = require('mssql')
 
const config = {
    user: 'Robin',
    password: 'password123',
    server: 'aei-sql.avans.nl',
    database: 'RobinTest',
    port: 1443,
    driver: 'msnodesql',
    connectionTimeout: 1500, 
    options: {
        // 'true' if you're on Windows Azure
        encrypt: false
    }
}

let connect = async () => {
    try {
        await sql.connect(config)
        const result = await sql.query(`select 1+1 AS result`)
        console.dir(result)
        sql.close()
    } catch (err) {
        console.dir('Error: ' + err)
    }
}

connect()