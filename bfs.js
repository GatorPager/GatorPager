const express = require("express");
const { exec } = require("child_process");
const axios = require("axios");
const fetch = require("node-fetch");
const app = express();
const port = 5000;
const csvtojson = require("csvtojson");
var fs = require("fs");
var parse = require("csv-parse");
const path = require('path');

var data = fs.readFileSync('rand.json');
var fake = JSON.parse(data)

var data2 = fs.readFileSync('rand2.json');
var fake2 = JSON.parse(data2)


class Page {
    constructor(id, target, url) {
      this.id = id;
      this.target = target;
      this.url = url;
    }
  }


// Add edge, undirected


function processEntries(entries) {
  var edges = [];
  var pages = "";

  for (let i = 0; i < entries.length; i++) {
    var find = parseInt(entries[i].target);

    if (find >= entries.length) {
      if (i == entries.length - 1) {
        edges[i] = "n/a";
        pages += "n/a";
      } else {
        edges[i] = "n/a ";
        pages += "n/a ";
      }
    } else {
      if (i == entries.length - 1) {
        edges[i] = [entries[i].url, entries[find].url];
        pages += entries[i].url;
      } else {
        edges[i] = [entries[i].url, entries[find].url];
        pages += entries[i].url + " ";
      }
    }
  }

  pageslist = pages.split(" ");
//   console.log(pageslist);
//   console.log(edges);




  
 fs.writeFile('./rand.json', JSON.stringify(pageslist), err => {
     if (err) {
         console.log('error');
     } 
     else {
         console.log('good');
     }
 })

 fs.writeFile('./rand2.json', JSON.stringify(edges), err => {
    if (err) {
        console.log('error');
    } 
    else {
        console.log('good');
    }
})


//    pageslist.forEach(addNode);
//    edges.forEach((route) => addEdge(...route));

}




var airports = "google yahoo ufl youtube".split(" ");

var routes = [
  ["google", "yahoo"],
  ["google", "ufl"],
  ["ufl", "youtube"],
  ["youtube", "google"],

  
];



airports = fake;
routes = fake2;

console.log(airports)

var pages = []

async function readCSV() {
    let entries = [];
    let count = 0;
fs.createReadStream("100RAND.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    count++;
    entries.push(new Page(row[0], row[1], row[2]));

    if (count % 100 == 0) {
      processEntries(entries);
      count = 0;
      entries = []; // clear the array
    }
  })
  .on("end", function () {
    processEntries(entries);
  });
}

readCSV()


// The graph
const adjacencyList = new Map();



 function addNode(airport) {
   adjacencyList.set(airport, []);
 }



function addEdge(origin, destination) {
//  adjacencyList.set(origin, destination);
//  adjacencyList.set(destination, origin);
adjacencyList.get(origin).push(destination);
adjacencyList.get(destination).push(origin);
}

// Create the Graph

   airports.forEach(addNode);
   routes.forEach((route) => addEdge(...route));

   console.log(airports);
    console.log(fake);
   function bfs(start) {
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift(); // mutates the queue

    const destinations = adjacencyList.set(airport);

    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log(`BFS found Bangkok!`);
      }

      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
}

bfs("PHX");

function dfs(start, visited, target) {
  console.log(start);

  visited.add(start);

  const destinations = adjacencyList.get(start);
    
  for (const destination of destinations) {
    if (destination === "BKK") {
      console.log("found " + target);
      break;
    } else {
        console.log("NOT FOUND NOT FOUND");
    }

    if (!visited.has(destination)) {
      dfs(destination, visited, target);
    }
  }
}
visited = new Set();
dfs("LOS", visited, "PHX");
