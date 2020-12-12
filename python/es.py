from elasticsearch import Elasticsearch

es = Elasticsearch()

# you can specify to sniff on startup to inspect the cluster and load
# balance across all nodes
# es = Elasticsearch(["node1", "node2"], sniff_on_start=True, sniff_timeout=20)

# you can also sniff periodically and/or after failure:
# es = Elasticsearch(["seed1", "seed2"],
#           sniff_on_start=True,
#           sniff_on_connection_fail=True,
#           sniffer_timeout=60)

import utils

# get single doc from posts index start

# important note: only id can be searched by get method

data = es.get(index="posts", id="qetKVXYBGVp9BBLfbcL2")

print(utils.format_doc2(data))

# get single doc from posts index end


# get all docs from index posts start 

data = es.search(index="posts", body={"query": {"match_all":{}}}) 

print(utils.format_list_doc(data))

# get all docs from index posts end


# elastic search by query

# try 1 with should(work same as OR operator)

doc = {
    "query": {
        "bool": {
        "should": [
            {
            "match_phrase": {
                "post": "post title 2"
            }
            },
            {
            "match_phrase": {
                "body": "post body 3"
            }
            }
        ]
        }
      }
    }

data = es.search(index="posts", body=doc) 

print(utils.format_list_doc(data))

# try 2 with must not (work same as NAND operator)

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

data = es.search(index="posts", body=doc) 

print(utils.format_list_doc(data))

# try 3 with must(work same as AND operator)

doc = {
    "query": {
        "bool": {
            "must": {
                "match_phrase": {
                "post": "post title 2"
                }
            }
        }
    }
}

data = es.search(index="posts", body=doc)
print(utils.format_list_doc(data))


# try 4 only query by match phrase start

doc = {
    "query":{
        "match_phrase":{
            "post": "title 2"
        }
    }
}

data = es.search(index="posts", body=doc)

print(utils.format_list_doc(data))

# try 4 only query by match phrase end



# es post to doc start

doc = {
    "id": "4",
    "post": "post title 4",
    "body": "post body 4"
}

response = es.create(index="posts",id="asdwe3cxc", body=doc)

print(response)

# es post to doc end






