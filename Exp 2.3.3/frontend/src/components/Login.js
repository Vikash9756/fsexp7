import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (name.trim()) setUser(name);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, borderRadius: 3, width: 300 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Enter Chat
        </Typography>

        <TextField
          fullWidth
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleJoin}>
          Join
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;