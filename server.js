const express = require("express");
const app = express();
require("./db/connection"); // Ensure DB connection is established

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
