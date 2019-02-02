const dgram = require('dgram')

const server = dgram.createSocket('udp4')

const message = Buffer.from('some message from server')

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => { // rinfo: Remote address information
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
  server.send(message, 0, message.length, rinfo.port, rinfo.address, (err, bytes) => {
	if (err) {
		console.log(err)
		return
	}
	console.log(`server send ${bytes} message`)
	})
})

server.on('listening', () => {
  const address = server.address()
  console.log(`server listening ${address.address}:${address.port}`)
});

server.bind(41234)
// server listening 0.0.0.0:41234
