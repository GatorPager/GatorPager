const express = require("express");
const { exec } = require("child_process");
const axios = require("axios");
const fetch = require("node-fetch");
const app = express();
const port = 5000;
const csvtojson = require("csvtojson");
var fs = require("fs");
var parse = require("csv-parse");

class Page {
  constructor(id, target, url) {
    this.id = id;
    this.target = target;
    this.url = url;
  }
}

class Graph {

    adjacencyList = new Map();
    constructor(edges, pages) {
        this.edges = [];
        this.pages = "";
        this.pageslist = [];
    }
  

  addEdge(origin, destination) {
    adjacencyList.get(origin).push(destination);
    adjacencyList.get(destination).push(origin);
  }
  addNode(airport) {
    adjacencyList.set(airport, []);
  }

  processEntries(entries) {
    // var edges = [];
    // var pages = "";


    for (let i = 0; i < entries.length; i++) {
      var find = parseInt(entries[i].target);

      if (find >= entries.length) {
        if (i == entries.length - 1) {
          this.edges[i] = "n/a";
          this.pages += "n/a";
        } else {
          this.edges[i] = "n/a ";
          this.pages += "n/a ";
        }
      } else {
        if (i == entries.length - 1) {
          this.edges[i] = [entries[i].url, entries[find].url];
          this.pages += entries[i].url;
        } else {
          this.edges[i] = [entries[i].url, entries[find].url];
          this.pages += entries[i].url + " ";
        }
      }
    }

    this.pageslist = this.pages.split(" ");
    console.log(this.pageslist);
    console.log(this.edges);
  }

  readCSV() {
    let count = 0;
    let entries = [];
    fs.createReadStream("url.csv")
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

  bfs(start) {
    const visited = new Set();

    const queue = [start];

    while (queue.length > 0) {
      const airport = queue.shift(); // mutates the queue

      const destinations = adjacencyList.get(pages);

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

  dfs(start, visited, target) {
    console.log(start);
  
    visited.add(start);
  
    const destinations = adjacencyList.get(start);
  
    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log("found " + target);
        break;
      }
  
      if (!visited.has(destination)) {
        dfs(destination, visited, target);
      }
    }
  }
}

// const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");

// const routes = [
//   ["PHX", "LAX"],
//   ["PHX", "JFK"],
//   ["JFK", "OKC"],
//   ["JFK", "HEL"],
//   ["JFK", "LOS"],
//   ["MEX", "LAX"],
//   ["MEX", "BKK"],
//   ["MEX", "LIM"],
//   ["MEX", "EZE"],
//   ["LIM", "BKK"],
// ];

// bfs("PHX");

// visited = new Set();
// dfs("LOS", visited, "PHX");

PagesGraph = new Graph();

PagesGraph.readCSV();