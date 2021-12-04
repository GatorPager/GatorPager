import React, { useState, useEffect, useRef, createRef } from "react";
import "./App.css";
import ForceGraph3D from "react-force-graph-3d";
import test from "./blocks.json";

// Usage: <CypherViz driver={driver}/>

class Graph extends React.Component {
  
  constructor({ driver }) {

    super();
    this.driver = driver;

    this.yourRef = createRef();

    this.state = {
      data: test
    };
  }



  // handleChange = (event) => {
  //   this.setState({ query: event.target.value });
  // };
  // loadData = async () => {
  //   let session = await this.driver.session({ database: "gameofthrones" });
  //   let res = await session.run(this.state.query);
  //   session.close();
  //   console.log(res);
  //   let nodes = new Set();
  //   let links = res.records.map((r) => {
  //     let source = r.get("source");
  //     nodes.add(source);
  //     nodes.add(target);
  //     return { source, target };
  //   });
  //   nodes = Array.from(nodes).map((id) => {
  //     return { id };
  //   });
  //   this.setState({ data: { nodes, links } });


  render() {
    // };
    

    return (
      <div>
        {/* <textarea
          style={{ display: "block", width: "800px", height: "100px" }}
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button onClick={this.loadData}>Reload</button> */}
        
        <ForceGraph3D
          graphData={this.state.data}
          nodeId="id"
          linkCurvature={0.1}
          nodeLabel="value"
          nodeLabel="id"
          nodeAutoColorBy="group"
          onNodeClick={(node, event) => {
        
            window.location = (node.id) 

          }}
          linkLabel = "value"
        />
      </div>
    );
  }
}

export default Graph;
