const express = require('express')
const { exec } = require("child_process");
const axios = require('axios');

fs = require('fs');

const app = express()
const port = 5000
const usersData= [];



app.get('/', (req, res) => {

  res.send('Hello World!')
})
app.get('/search', (req, res) => {
  console.log("search")

//   exec("cd frontend; cd src; g++ -o output main.cpp", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });
const test = "www.ufl.edu"
fs.writeFile('./frontend/src/search.txt', test, function (err) {
  if (err) return console.log(err);
});

app.get('/post_search', (req, res) => {
  console.log("testing");
})

exec("cd frontend/src; python3 graph.py", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



