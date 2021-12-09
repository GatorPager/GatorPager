from csv import reader
import json
import time
import _pickle as cPickle





class Page:
    def __init__(self, source, target, url):
        self.source = source
        self.target = target
        self.url = url


# f = open("./frontend/src/search.txt", "r")

# print(f.read())



pages = []
with open('test.csv', 'r') as read_obj:
    csv_reader = reader(read_obj)
    page_list = list(csv_reader)



for x in page_list:
    pages.append(Page(x[0], x[1], x[2]))

urls = []
urlsid = []
count = 0
for i in pages:
    urls.append(i.url)
    urlsid.append(count)
    count += 1

subs =  input("Search: ")


res = list(filter(lambda x: subs in x, urls))


curr = 0
for x in range(0, len(pages)):
    if res[0] == pages[x].url:
        curr = x
        break 



graph_test = {}

with open('data.csv', 'r') as read_obj:
    csv_reader = reader(read_obj)
    adjList = list(csv_reader)

count_1 = 0
for x in adjList:

    two = int(x[1])
    three = int(x[2])
    graph_test.update({ count_1:[two, three]})
    count_1 += 1

graph_test.update({100000: [94000, 98000]})





GRAPH = graph_test

"{1: [2,3], 2:"

# print(data)
def BFS(start, target, GRAPH):
  # 'Use a QUEUE to search.'
  print("Source:",start,"Target:",target)
  queue = [start]
  visited = []

  while len(queue) > 0:
    x = queue.pop(0)

    if x == target:
      print("found",pages[x].url, "iterated")  
      visited.append(x)
      return
    elif x not in visited:
      visited = visited+[x]
    if GRAPH[x] is not None:
      # 'add nodes at the END of the queue'
      queue = queue + GRAPH[x]

  return visited


def DFS(start, target, GRAPH):
  # 'Use a STACK to search.'
  global DFSiter
  DFSiter = 0
  print("Source:",start,"Target:",target)
  stack = [start]
  visited = []

  while len(stack) > 0:
    x = stack.pop(0)
    DFSiter += 1
    if x == target:
      print("found",pages[x].url, "iterated", DFSiter)  
      visited.append(x)
      return
    elif x not in visited:
      visited = visited+[x]
    if GRAPH[x] is not None:
      stack = GRAPH[x] + stack

  return visited

beginning_timer = time.perf_counter()
print("BFS Path")
BFS(1,curr,GRAPH)
end_timer = time.perf_counter()
bfs_timer = end_timer - beginning_timer
print(f"BFS finished in {end_timer - beginning_timer:0.7f} seconds")



beginning_timer = time.perf_counter()
print("DFS Path",DFS(1,curr,GRAPH))
end_timer = time.perf_counter()
print(f"DFS the tutorial in {end_timer - beginning_timer:0.7f} seconds")
dfs_timer = end_timer - beginning_timer



print("✅")
print("---- SIMALIR NODES -----")
print("")
print(res)
print("")







f = open("similar.txt", "w")

similar = '['
for x in range(len(res) - 1):
  similar += "'"
  similar += res[x]
  similar += "'"
  similar += ","
similar += "'"  
similar += res[-1]
similar += "'"  
similar += "]"  

dfsTime = str(dfs_timer)
bfsTime = str(bfs_timer)

data ={
    "iterations" : DFSiter,
    "dfs_time" : dfs_timer,
    "bfs_time" : bfs_timer,
    "search" : subs
}
  
json_object = json.dumps(data, indent = 4)
  
# Writing to sample.json
with open("sample.json", "w") as outfile:
    outfile.write(json_object)

f = open("similar.txt", "w")

similar = '['
for x in range(len(res) - 1):
  similar += "'"
  similar += res[x]
  similar += "'"
  similar += ","
similar += "'"  
similar += res[-1]
similar += "'"  
similar += "]"  


f.write(similar)
f.close()

import os
os.system('./main')


#test
#anime