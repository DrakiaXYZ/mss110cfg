import Telnet = require('telnet-client');

var connection = new Telnet()

var params = {
    host: '127.0.0.1',
    port: 23,
    shellPrompt: '/ # ',
    timeout: 1500,
    // removeEcho: 4
}

connection.on('ready', function (prompt) {
    let cmd = "ls";
    connection.exec(cmd, function (err, response) {
        console.log(response)
    })
})

connection.on('timeout', function () {
    console.log('socket timeout!')
    connection.end()
})

connection.on('close', function () {
    console.log('connection closed')
})

connection.connect(params)