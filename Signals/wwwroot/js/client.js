﻿const hubConnection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

const queryStringForInput = 'input[name="new_message"]';

hubConnection.on("Send", (data) => {
    let message = document.createElement("p");
    message.classList.add("content_chat--content--message");
    message.appendChild(document.createTextNode(data));
    let firstElement = document.querySelector(".content_chat--content").firstChild;
    document.querySelector(".content_chat--content").insertBefore(message, firstElement);
});

sendNewMessage = () => {
    let message = document.querySelector(queryStringForInput).value;
    hubConnection.invoke("Send", message);
}

document.querySelector(queryStringForInput).addEventListener("keyup", event => {
    const inputMessage = document.querySelector(queryStringForInput);
    if (inputMessage.value === null || inputMessage.value === undefined
        || inputMessage.value === "" || inputMessage.value === "хд"
        || !inputMessage.value.trim().length) {
        return;
    }

    if (event.keyCode === 13) {
        sendNewMessage();
        document.querySelector(queryStringForInput).value = "";
    }
});

hubConnection.start();