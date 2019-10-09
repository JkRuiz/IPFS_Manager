//Required modules
const ipfsAPI = require("ipfs-api");
const express = require("express");
const fs = require("fs");
const app = express();
var cors = require("cors");

app.use(cors());
//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

//Addfile router for adding file a local file to the IPFS network without any local node
app.get("/addfile", function(req, res) {
  //Reading file from computer
  let testFile = fs.readFileSync(
    "/Users/JuanCamiloRuiz/Downloads/certificado.pdf"
  );
  //Creating buffer for ipfs function to add file to the system
  let testBuffer = new Buffer(testFile);

  ipfs.files.add(testBuffer, function(err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file);
    res.send(file[0].hash);
  });
});

//Getting the uploaded file via hash code.
app.get("/getfile", function(req, res) {
  //This hash is returned hash of addFile router.
  const validCID = "HASH_CODE";

  ipfs.files.get(validCID, function(err, files) {
    files.forEach(file => {
      console.log(file.content.toString("utf8"));
    });
  });
});

app.listen(3090, () => console.log("App listening on port!"));
