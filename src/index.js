'use strict';

module.exports = {
    register(/*{ strapi }*/) { },

    bootstrap({ strapi }) {
        const { Server } = require('socket.io');

        const io = new Server(strapi.server.httpServer, {
            cors: {
                origin: 'https://chat-app-eta-mauve.vercel.app/', 
                methods: ['GET', 'POST'],
                allowedHeaders: ['my-custom-header'],
                credentials: true
            }
        });

        const users = {}; 

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('register', (userId) => {
                users[userId] = socket.id;
                console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
            });

            socket.on("sendMsg", (msgData) => {
                const newMsg = {
                    id: new Date().getTime(),
                    uid: msgData.senderId,
                    msg: msgData.msg
                };

                const recipientSocketId = users[msgData.recipientId];
                if (recipientSocketId) {
                    console.log(`Sending message from ${msgData.senderId} to ${msgData.recipientId}`);
                    io.to(recipientSocketId).emit('recvMsg', newMsg); 
                } else {
                    console.log('Recipient not connected');
                }

                socket.emit('recvMsg', newMsg);
            });

            socket.on("disconnect", () => {
                console.log("A user disconnected:", socket.id);

                for (let userId in users) {
                    if (users[userId] === socket.id) {
                        delete users[userId];
                        break;
                    }
                }
            });
        });

        strapi.io = io;
    },
};
