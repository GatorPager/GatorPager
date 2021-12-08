#include <iostream>
#include <fstream>
#include <set>
using namespace std;

set<string> splitString(string str);
void nodeJSON(set<string> s, ofstream* ofs);
void linkJSON(set<string> s, ofstream* ofs);

int main() 
{
  //read file
  string input = "";
  string firstNode = "";
  ifstream in("similar.txt");
  getline(in, input);
  set<string> data = splitString(input); 
  for(auto& x : data)
    cout << x << endl;
  ofstream ofs("nodes.json", ofstream::out);
  nodeJSON(data, &ofs);
  linkJSON(data, &ofs);
  ofs.close();
  return 0;
} 

set<string> splitString(string str)
{
  char delimiter = '\'';
	string token;
  set<string> strs;
	long unsigned int start = 0;
  long unsigned int curr = 0;
  long unsigned int end = 0;
	long unsigned int length = 0;

	while (end <= str.length())
	{
    end = str.find(delimiter, start);
		length = end - start;
		token = str.substr(start, length);
    if(((token.compare("[") == 0) || (token.compare(", ") == 0) 
          || (token.compare("]") == 0)))
    {
      //cout << "wrong string" << endl;
      start = end + length - 1;
      continue;
    }
    if(token != "")
      strs.insert(token);
		start = end + 1;
    curr = start + 1;
    if(curr < str.length())
    {
      if(str.at(curr) == '\'')
      {
        start = curr+1;
      }
    }
	}
  return strs;
}//end of function

void nodeJSON(set<string> s, ofstream* ofs)
{
  set<string> sCopy = s;
  *ofs << "{\n";
  *ofs << "\"nodes\": [\n";
  set<string>::iterator it = sCopy.begin();
  string firstURL = *it;
  int sCopySize = sCopy.size();
  for(int i = 0; i < sCopySize; i++)
  {
    it = sCopy.begin();
    string currURL = *it;
    sCopy.erase(currURL);
    if(i == (sCopySize - 1))
      *ofs << "{ \"id\": \"" << currURL << "\", \"group\": 1}\n";
    else
      *ofs << "{ \"id\": \"" << currURL << "\", \"group\": 1},\n";
  }
  *ofs << "],\n";
  }// end of function

void linkJSON(set<string> s, ofstream* ofs)
{
  set<string> sCopy = s;
  *ofs << "\"links\": [\n";
  set<string>::iterator it = sCopy.begin();
  string firstURL = *it;
  int sCopySize = sCopy.size();
  for(int i = 0; i < sCopySize; i++)
  {
    it = sCopy.begin();
    string currURL = *it;
    sCopy.erase(currURL);
    it = sCopy.begin();
    if(i == (sCopySize - 1))
      *ofs << "{ \"source\":\"" << currURL << "\", \"target\":\"" << firstURL << "\"}\n";
    else
      *ofs << "{ \"source\":\"" << currURL << "\", \"target\":\"" << *it << "\"},\n";
  }
  *ofs << "]\n";
  *ofs << "}";
} // end of function
