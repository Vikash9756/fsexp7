import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

function Chat({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [users, setUsers] = useState([]);

  const endRef = useRef();

  useEffect(() => {
    socket.emit("join", user);

    socket.on("message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on("typing", (username) => {
      setTypingUser(username);
      setTimeout(() => setTypingUser(""), 1000);
    });

    socket.on("users", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("message");
      socket.off("typing");
      socket.off("users");
    };
  }, [user]);

  // auto scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        user,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      });
      setMessage("");
    }
  };

  return (
    <Box display="flex" height="100vh">
      
      {/* Sidebar */}
      <Box sx={{ width: "25%", borderRight: "1px solid #ccc", p: 2 }}>
        <Typography variant="h6">Online Users</Typography>
        {users.map(u => (
          <Typography key={u.id}>{u.username}</Typography>
        ))}
      </Box>

      {/* Chat Area */}
      <Box sx={{ width: "75%", display: "flex", flexDirection: "column" }}>
        
        {/* Messages */}
        <Paper sx={{ flex: 1, p: 2, overflowY: "auto" }}>
          
          {messages.map((m, i) => {
            if (m.user === "System") {
              return (
                <Typography key={i} align="center" sx={{ color: "gray", fontStyle: "italic" }}>
                  {m.text}
                </Typography>
              );
            }

            return (
              <Box
                key={i}
                display="flex"
                justifyContent={m.user === user ? "flex-end" : "flex-start"}
                mb={1}
              >
                <Box
                  sx={{
                    backgroundColor: m.user === user ? "#1976d2" : "#eee",
                    color: m.user === user ? "#fff" : "#000",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "60%"
                  }}
                >
                  <Typography variant="body2"><strong>{m.user}</strong></Typography>
                  <Typography>{m.text}</Typography>
                  <Typography variant="caption">{m.time}</Typography>
                </Box>
              </Box>
            );
          })}

          <div ref={endRef}></div>

          {typingUser && (
            <Typography sx={{ fontStyle: "italic" }}>
              {typingUser} is typing...
            </Typography>
          )}

        </Paper>

        {/* Input */}
        <Box display="flex" p={2} gap={2}>
          <TextField
            fullWidth
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              socket.emit("typing", user);
              if (e.key === "Enter") sendMessage();
            }}
          />

          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>

      </Box>
    </Box>
  );
}

export default Chat;