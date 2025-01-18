const fastify = require('fastify')({ logger: true });

const nameList = ["Alice", "Bob", "Charlie"]; // Example initial data

// Define POST endpoint
fastify.post("/names", async (req, res) => {
  try {
    const { name } = req.body; // Destructure 'name' from the request body
    if (!name) {
      return res.status(400).send({ error: "Name is required" }); // Handle missing name
    }

    console.log("Adding name to the list:", name);
    nameList.push(name); // Add the name to the list

    return { names: nameList }; // Return the updated name list
  } catch (error) {
    fastify.log.error(error);
    return res.status(500).send({ error: "An error occurred" }); // Handle unexpected errors
  }
});

fastify.get("/names",(req, res)=>{
    return {nameList};
});

// Start the server
fastify.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});