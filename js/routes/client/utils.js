const format_single_doc = (doc) => {
  let new_doc = {
    id: doc._source.id,
    es_id: doc._id,
    title: doc._source.title,
    body: doc._source.body,
  };
  return new_doc;
};

const format_list_doc = (doc_list) => {
  let formatted_list = [];
  doc_list.map((item) => {
    formatted_list.push(format_single_doc(item));
  });
  return formatted_list;
};

module.exports = {
  formatter: format_list_doc,
};
