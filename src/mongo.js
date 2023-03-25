
export async function getPartsById(id) {
  const credentials = "Ob2tQnekGzdkaDPc0c6VkAtb2cKSOREbAF2zy9Kx6DYQqobQGbioU20mBRiLgO84";
  const dbName = 'PartLookup';
  const collectionName = '99NB';
  
  const apiAuth = await fetch('https://realm.mongodb.com/api/client/v2.0/app/data-zkogu/auth/providers/anon-user/login', {
    method: 'POST',
  });
  console.log(apiAuth)
  const auth = await apiAuth.json()
  console.log(auth)
  const bear = 'Bearer ' + auth.access_token;
  const response = await fetch('https://eu-west-1.aws.data.mongodb-api.com/app/data-zkogu/endpoint/data/v1/action/findOne', {
    method: 'POST',
    headers: {
      'Authorization': bear,
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*'
    },
    body: JSON.stringify({
      collection: collectionName,
      database: dbName,
      dataSource: collectionName,
      filter: {"id": id}
    })
  });
  const data = await response.json();
  console.log(data)
  return data.document.parts;
}



