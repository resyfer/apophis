function send(socket, message, ok = true, username, rgb) {
    socket.write(JSON.stringify({
        ok,
        message,
        rgb,
        username,
    }));
}
function receive(data) {
    return JSON.parse(data.toString());
}
export { send, receive };
