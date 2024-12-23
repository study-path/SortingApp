import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { quickSort } from "./algorithms/quickSort.js";
import { mergeSort } from "./algorithms/mergeSort.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
  next();
});

//bodyParser.limit = "50mb";
app.use(bodyParser.json());

const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/generate", async (req, res) => {
  console.log("request numbers, start");
  const maxNumber = req.query.maxnumber;
  const nums = [];

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("Max number: ", req.query.maxnumber);
  console.log("Count: ", req.query.count);
  for (let i = 0; i < req.query.count; i++) {
    nums.push(Math.floor(Math.random() * maxNumber + 1));
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(nums));
  console.log("request numbers, end");
});

app.post("/sort", (req, res) => {
  console.log("request sorting, start");
  const data = req.body;
  console.log("data: ", data);
  let numbers = JSON.parse(data.numbers);
  let result;

  if (data.option == "bubbleSort") {
    result = bubbleSort(numbers);
  } else if (data.option == "quickSort") {
    result = quickSort(numbers);
  } else if (data.option == "mergeSort") {
    result = mergeSort(numbers);
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(result));
  console.log("request sorting, end");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${port}`);
});
