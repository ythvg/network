const dgram = require('dgram')

const client = dgram.createSocket('udp4')

const message = Buffer.from('some message from client')

client.send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
	if (err) {
		console.log(err)
		return
	}
	console.log(`client send ${bytes} message`)
})

client.on('message', (msg, rinfo) => {
	console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`)
})