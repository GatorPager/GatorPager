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

struct Node
{
public:
    string id;
    string url;
    string type;

    Node()
    {

        id = "0";
        url = "https://www.ufl.edu/";
        type = "n/a";
    }

    Node(string _id, string _url, string _type)
    {

        id = _id;
        url = _url;
        type = _type;
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

    ifstream file("URL.csv");

    if (!file.is_open())
    {

        cout << "error" << endl;
        return 0;
    }
    string id;
    string url;
    string type;

    string lineString;
    string line;
    while (getline(file, line))
    {
        stringstream ss(line);

        getline(ss, id, ',');
        getline(ss, url, ',');
        getline(ss, type, ',');

        if (type != "adult")
        {
            pages.push_back(Node(id, url, type));
        }

        // for(int i = 0; i < 100; i++) {
        //     cout << pages[i+533].url << endl;
        // }
    }
    file.close();

    // ADJ LIST

    // int V = 2;
	// vector<Node> adj[V];
    // //NOT WORKING AS OF YET
    // add_edge(adj, pages[1], pages[0]);

    // printGraph(adj, V);

    return 0;
}
