from elasticsearch import Elasticsearch
import requests
import json

es = Elasticsearch()


# GET SINGLE ITEM FROM ES_ID WITH API CALL START

# important note: here posts is the index(table) and post is the type 
# and q-tMVXYBGVp9BBLfHMLL is the es_id of the doc(row)

response = requests.get("http://localhost:9200/posts/post/q-tMVXYBGVp9BBLfHMLL")

print(response.json())

# GET SINGLE ITEM FROM ES_ID USING API CALL END



# GET LIST OF ITEM USING API CALL START

response = requests.get("http://localhost:9200/posts/post/_search")

print(response.json())

# GET LIST OF ITEM USING API CALL END


# SEARCH USING QUERY WITH API CALL START

# important note: have to send the data using json string 
# and specify headers Content-Type: application/json

doc = {
    "query": {
        "bool": {
            "must_not": {
                "match_phrase": {
                "post": "post title 2"
                }
            }
        }
      }
    }

doc = json.dumps(doc)
headers = {
    "Content-Type": "application/json"
}

response = requests.post("http://localhost:9200/posts/post/_search",headers=headers, data=doc)

print(response.json())

# SEARCH USING QUERY WITH API CALL END


# POST ITEM IN ES USING API CALL START

# important note: have to send the data using json string 
# and specify headers Content-Type: application/json

doc = {
    "id":1,
    "title": "post title 1",
    "body": "post body 2"
}

doc = json.dumps(doc)
headers = {
    "Content-Type": "application/json"
}

response = requests.post("http://localhost:9200/posts/post/ewrfdssdf", headers=headers, data=doc)

print(response) # 201

# POST ITEM IN ES USING API CALL END


# DELETE ITEM IS ES USING API CALL START

response = requests.delete("http://localhost:9200/posts/post/q-tMVXYBGVp9BBLfHMLL")

print(response) # 200

# DELETE ITEM IN ES USING API CALL END