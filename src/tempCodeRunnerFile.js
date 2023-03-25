  const credentials = "Ob2tQnekGzdkaDPc0c6VkAtb2cKSOREbAF2zy9Kx6DYQqobQGbioU20mBRiLgO84";
  const dbName = 'PartLookup';
  const collectionName = '99NB';
  const response = await fetch('https://eu-west-1.aws.data.mongodb-api.com/app/data-zkogu/endpoint/data/v1/action/findOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': credentials
    },
    body: JSON.stringify({
      collection: collectionName,
      database: dbName,
      dataSource: collectionName,
      filter: {"id": "1030A"}
    })
  });
  const data = await response.json();
  console.log(data.document.parts);