class Struct:
    def __init__(self, **entries):
        # this method takes in a dictionary
        self.__dict__.update(entries)

def format_list_doc(doc_list):
    l = []
    obj = Struct(**doc_list)
    obj2 = Struct(**obj.hits)
    for i in obj2.hits:
        l.append(format_doc2(i))
    return l

def format_doc1(doc):

    new_doc = {
        "id": doc["_source"]["id"],
        "es_id": doc["_id"],
        "title": doc["_source"]["post"],
        "body": doc["_source"]["body"] 

    }
    return new_doc

def format_doc2(doc):
    obj = Struct(**doc)
    source = Struct(**obj._source)
    new_doc = {
        "id": source.id,
        "es_id": obj._id,
        "title": source.post,
        "body": source.body 
    }
    return new_doc