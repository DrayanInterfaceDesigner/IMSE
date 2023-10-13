const path = require('path')
const dotenv = require('dotenv')

class EnvJinn {
    constructor(envPath) {
        this.envPath = envPath
        this.envFile = this.envPath
        this.result = dotenv.config({ path: this.envFile })
    }

    get() {
        const {result} = this
        if (result.error) {
            console.error('Error loading .env file:', result.error)
            return result.error
        } else {
            console.log('Environment variables loaded successfully')
            return result.parsed
        }
    }
}

module.exports = {EnvJinn}