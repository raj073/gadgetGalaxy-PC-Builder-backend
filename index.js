const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mlxaon5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    const db = client.db("gadgetGalaxy_pcbuilder");

    const pcBuildersCollection = db.collection("pcbuilder");
    const addToBuildCollection = db.collection("addToBuild");

    app.get("/products", async (req, res) => {
      const cursor = pcBuildersCollection.find({});
      const products = await cursor.toArray();
      res.send({ data: products });
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await pcBuildersCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.get("/cpu-processor", async (req, res) => {
      const cursor = pcBuildersCollection.find({ category: "CPU/Processor" });
      const cpuProcessorProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: cpuProcessorProducts });
    });

    app.get("/motherboard", async (req, res) => {
      const cursor = pcBuildersCollection.find({ category: "Motherboard" });
      const motherboardProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: motherboardProducts });
    });

    app.get("/ram", async (req, res) => {
      const cursor = pcBuildersCollection.find({ category: "RAM" });
      const ramProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: ramProducts });
    });

    app.get("/power-supply", async (req, res) => {
      const cursor = pcBuildersCollection.find({
        category: "Power Supply Unit",
      });
      const powerSupplyProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: powerSupplyProducts });
    });

    app.get("/storage-device", async (req, res) => {
      const cursor = pcBuildersCollection.find({
        category: "Storage Device",
      });
      const storageDeviceProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: storageDeviceProducts });
    });
    app.get("/monitor", async (req, res) => {
      const cursor = pcBuildersCollection.find({
        category: "Monitor",
      });
      const monitorProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: monitorProducts });
    });

    app.get("/others", async (req, res) => {
      const cursor = pcBuildersCollection.find({
        category: "Others",
      });
      const othersProducts = await cursor.toArray();
      console.log(cursor);
      res.send({ data: othersProducts });
    });

    app.get("/pcbuilder", async (req, res) => {
      const productId = req.query.productId;
      const result = await pcBuildersCollection.findOne({
        _id: new ObjectId(productId),
      });

      res.send(result);
    });

    app.post("/addtobuild", async (req, res) => {
      const pcbuild = req.body;
      console.log(pcbuild);

      pcbuild.createdAt = new Date();

      const query = { _id: pcbuild._id };

      const updateOperation = {
        $set: pcbuild,
        $inc: { quantity: 1 },
      };

      const result = await addToBuildCollection.findOneAndUpdate(
        query,
        updateOperation,
        { upsert: true }
      );

      res.send(result);
    });

    app.get("/addtobuildCPU", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "CPU/Processor" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });

    app.get("/addtobuildMotherboard", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "Motherboard" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });

    app.get("/addtobuildRam", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "RAM" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });

    app.get("/addtobuildPower", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "Power Supply Unit" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });

    app.get("/addtobuildStorageDevice", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "Storage Device" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });

    app.get("/addtobuildMonitor", async (req, res) => {
      const cursor = addToBuildCollection
        .find({ category: "Monitor" })
        .sort({ createdAt: -1 })
        .limit(1);
      const addToBuildProducts = await cursor.toArray();
      res.send({ data: addToBuildProducts });
    });
  } finally {
  }
};

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Gadget Galaxy PC Builder Server is Running");
});

app.listen(port, () => {
  console.log(`Gadget Galaxy PC Builder Server is Running on ${port}`);
});
