let socket = new WebSocket("ws://localhost:8095/"),
log = document.getElementById('log');
socket.onopen = function (e) {
    console.log('okay we opened a connection');
};
socket.onmessage = function (e) {
    console.log('we have a message');
    console.log(e.data.toString());
    log.value += e.data.toString();
    if(e.data.toString()=='reload'){
        // location.reload();
        fetch('/fetch.json')
        .then((response) => response.json())
        .then((data) => console.log(data));
        console.log('reload')
    }
};
socket.onclose = function (e) {
    console.log('socket closed')
    if (e.wasClean) {
        console.log('clean close');
        console.log(e.code);
        console.log(e.reason);
    } else {
        console.log('conection died');
        console.log(e.code);
    }
};