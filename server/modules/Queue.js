class Queue {
    constructor(config) {
        this.default = {logFolder: null}
        this.queue = new Array()
        this.config = !config ? this.default : config
        this.logFolder = this.config.logFolder
    }

    enqueue(student)  {

        this.queue.push(student)

        // if(!this.logFolder) return
        // const date = this.makeLogInfo()
        // const logMessage = `${student.id} enqueued with status ${student.train.status} | ${date}`
        // const log = {
        //     for: student.id,
        //     status: student.train.status,
        //     date: date,
        //     message: logMessage
        // }
        // this.writeLog(log, this.logFolder)
    }

    dequeue() {
        if(this.isEmpty()) return
        this.pop()

        // if(!this.logFolder) return
        // const date = this.makeLogInfo()
        // const logMessage = `${node.name} enqueued with status ${node.status} | ${date}`
        // const log = {
        //     for: node.name,
        //     status: node.status,
        //     date: date,
        //     message: logMessage
        // }
        // this.writeLog(log, this.logFolder)
    }

    makeLogInfo() {
        const date = new Date()
        const {hh, mm, ss, ms} = [
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()
        ]
        const {year, month, day} = [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()]
        const string = `[${hh}:${mm}:${ss}:${ms}] in [${year}/${month}/${day}] (UTC)`
        return string
    }

    writeLog(log, folder) {
        if(folder == null) return false
    }

    peek() {
        if(!this.isEmpty()) return this.queue[this.queue.length-1]
    }
    
    pop() {this.queue.pop()}

    isEmpty() {
        return this.queue.length > 0
    }
}

module.exports = {Queue}