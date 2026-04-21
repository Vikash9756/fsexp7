import React, { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState("");

  return (
    <div>
      {!user ? <Login setUser={setUser} /> : <Chat user={user} />}
    </div>
  );
}

export default App;