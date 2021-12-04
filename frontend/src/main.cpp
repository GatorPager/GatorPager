//
//  main.cpp
//  GatorPages
//
//  Created by James  Luberisse on 12/3/21.
//

#include <iostream>
#include <string>
#include <vector>
#include <fstream>
#include <sstream>
#include <list>

using namespace std;
struct Node { 
    string id;
    string target;
    string url;
    string weight;

    Node()
    {

        id = "0";
        target = "0";
        url = "n/a";
         weight = "0"; 
    }

    Node(string _id, string _target, string _url, string _weight)
    {

        id = _id;
        url = _url;
        target = _target;
        weight = _weight;
    }
};

void add_edge(vector<Node> pages_adj_list[], Node &u, Node &v) {    
   pages_adj_list[stoi(u.id)].push_back(v);
   pages_adj_list[stoi(v.id)].push_back(u);
}

void delEdge(vector<Node> adj[], Node &u, Node& v)
{
	// Traversing through the first vector list
	// and removing the second element from it
	for (int i = 0; i < adj[stoi(u.id)].size(); i++) {
		if (stoi(adj[stoi(u.id)][i].id) == stoi(v.id)) {
			adj[stoi(u.id)].erase(adj[stoi(u.id)].begin() + i);
			break;
		}
	}

	// Traversing through the second vector list
	// and removing the first element from it
	for (int i = 0; i < adj[stoi(v.id)].size(); i++) {
		if (stoi(adj[stoi(v.id)][i].id) == stoi(u.id)) {
			adj[stoi(v.id)].erase(adj[stoi(v.id)].begin() + i);
			break;
		}
	}
}

// A utility function to print the adjacency list
// representation of graph
void printGraph(vector<Node> adj[], int V)
{
	for (int v = 0; v < V; ++v) {
		cout << "vertex " << v << " ";
		for (auto x : adj[v])
			cout << "-> " << x.url;
		printf("\n");
	}
	printf("\n");
}


int main()
{

   vector<Node> pages;

    ifstream file("URL1.csv");

    if (!file.is_open())
    {

        cout << "error" << endl;
        return 0;
    }
    string id;
    string target;
    string url;
    string weight;

    string lineString;
    string line;
    while (getline(file, line))
    {
        stringstream ss(line);

        getline(ss, id, ',');
        getline(ss, target, ',');
        getline(ss, url, ',');
        getline(ss, weight, ',');

        // if (type != "adult")
        // {
        //     pages.push_back(Node(id, url, type));
        // }

        pages.push_back(Node(id, target, url, weight));

        // for(int i = 0; i < 100; i++) {
        //     cout << pages[i+533].url << endl;
        // }
    }
    file.close();



    // create target
    vector<Node> targets;

    for(int i = 0 ; i < pages.size(); i++) {
      int target = stoi(pages[i].target);
      Node node = pages[target];
      targets.push_back(node);
    }

    ofstream myfile;
   	myfile.open ("example.json");

		myfile << "{\n";
  	myfile << "\"nodes\": [\n";
      
    for(int i = 0 ; i < pages.size(); i++) {
    	myfile << "{ \"id\": \"" << pages[i].url << "\", \"group\": 1 },\n";
    }
  	
  	myfile << "],\n";
  	myfile << "\"links\": [\n";
    
  	for(int i = 0 ; i < pages.size(); i++) {
    	myfile << "{ \"source\": \"" << targets[i].url << "\", \"target\": \"" << pages[i].url << "\", \"value\": " << pages[i].weight << "},\n";
    }
  
  	myfile <<  "]\n";
		myfile << "}";
      	
    myfile.close();

    for(int i = 0 ; i < pages.size(); i++) {
    	cout << pages[i].url << " " << targets[i].url << endl;
    }

    // ADJ LIST

    // int V = 2;
	// vector<Node> adj[V];
    // //NOT WORKING AS OF YET
    // add_edge(adj, pages[1], pages[0]);
 
    // printGraph(adj, V);

    //
  
    return 0;
}