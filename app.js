const express = require('express')
const { exec } = require("child_process");
const axios = require('axios');


const app = express()
const port = 5000
const usersData= [];



app.get('/', (req, res) => {
  console.log("working")

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

exec("cd frontend; cd src; ./main", (error, stdout, stderr) => {
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

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



