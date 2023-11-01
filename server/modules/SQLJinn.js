const mysql = require('mysql2')
const {EnvJinn} = require('./EnvJinn')

class SQLJinn {
    
    constructor(envPath) {
        this.envConfig = new EnvJinn(envPath).get()
        this.connect()
    }

    connect() { mysql.createConnection(this.#makeConfig()) }
    query(query) { return this.#query(query) }


    #makeConfig() {
        const requiredProperties = ['HOST', 'USER', 'PASSWORD', 'DATABASE', 'PORT']

        for (const prop of requiredProperties) {
            if (typeof this.envConfig[prop] === 'undefined') {
                throw new Error(`
                    Making the config for DB connection failed. Did you pass the correct filepath for the .env file?
                    The parser is looking for: ${requiredProperties} (case-sensitive)
                    Make sure your env file has those.
                `)
            }
        }
    
        const res = {
            host: this.envConfig.HOST,
            user: this.envConfig.USER,
            password: this.envConfig.PASSWORD,
            database: this.envConfig.DATABASE,
            port: this.envConfig.PORT
        }
    
        return res
    }
    async #query(query) {
        try {
            const res = await new Promise((resolve, reject) => {
                connection.query(query, (err, res) => {
                    if(err) {console.log(`Error in query: ${err}`); reject(err)}
                    else resolve(res)
                }) 
            })
            return await res
        }
        catch(err) {
            console.log('The call failed, the DB may be down.')
            return err
        }
    }
}



module.exports = {SQLJinn}