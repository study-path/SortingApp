import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

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

app.use(bodyParser.json());

const port = 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/generate", (req, res) => {
  console.log("request numbers, start");
  const maxNumber = req.query.maxnumber;
  const nums = [];

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

  if (data.option == "bubbleSort") {
    for (let i = 0; i < numbers.length - 1; i++) {
      for (let z = 0; z < numbers.length - 1; z++) {
        if (numbers[z] > numbers[z + 1]) {
          let el = numbers[z];
          numbers[z] = numbers[z + 1];
          numbers[z + 1] = el;
        }
      }
    }
  } else if (data.option == "quickSort") {
    numbers = quickSort(numbers);
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(numbers));
  console.log("request sorting, end");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${port}`);
});

function quickSort(numbers) {
  if (numbers.length <= 1) return numbers;
  const pivot = numbers[Math.floor(numbers.length / 2)];
  const left = numbers.filter((num) => num < pivot);
  const right = numbers.filter((num) => num > pivot);
  const equal = numbers.filter((num) => num === pivot);

  return [...quickSort(left), ...equal, ...quickSort(right)];
}
