import React, { useState, useEffect, useRef, createRef } from "react";
import "./App.css";
import ForceGraph3D from "react-force-graph-3d";
import test from "./nodes.json";

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





  render() {

    

    return (
      <div>
        
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
