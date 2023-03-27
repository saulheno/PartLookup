
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
  //console.log(data)
  if (data.document === null) {
    console.log('No parts found');
    return null
  }
  return data.document.parts;
}

export async function getPartsSearch(searchTerm) {

  const searchInput = searchTerm; // replace with the search input
  const regexString = `.*${searchInput}.*`; // create a regex string to match partial input

  const credentials = "Ob2tQnekGzdkaDPc0c6VkAtb2cKSOREbAF2zy9Kx6DYQqobQGbioU20mBRiLgO84";
  const dbName = 'PartLookup';
  const collectionName = '99NB';
  
  const apiAuth = await fetch('https://realm.mongodb.com/api/client/v2.0/app/data-zkogu/auth/providers/anon-user/login', {
    method: 'POST',
  });
  //console.log(apiAuth)
  const auth = await apiAuth.json()
  //console.log(auth)
  const bear = 'Bearer ' + auth.access_token;
  const response = await fetch('https://eu-west-1.aws.data.mongodb-api.com/app/data-zkogu/endpoint/data/v1/action/find', {
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
      filter: {
        $or: [
          { "id": { $regex: regexString, $options: 'i' } },
          { "name": { $regex: regexString, $options: 'i' } }
        ]
      }
    })
  });
  const data = await response.json();
  let parts = [];
  console.log(data)
  for (let i = 0; i < data.documents.length; i++) {
    if (data.documents[i].name !== undefined) {
      parts[data.documents[i].id] = data.documents[i].name;
    } else {
      parts[data.documents[i].id] = '';
    }
  }
  console.log(parts);
  return parts;
}

export async function getParts() {
  const credentials = "Ob2tQnekGzdkaDPc0c6VkAtb2cKSOREbAF2zy9Kx6DYQqobQGbioU20mBRiLgO84";
  const dbName = 'PartLookup';
  const collectionName = '99NB';
  
  const apiAuth = await fetch('https://realm.mongodb.com/api/client/v2.0/app/data-zkogu/auth/providers/anon-user/login', {
    method: 'POST',
  });
  //console.log(apiAuth)
  const auth = await apiAuth.json()
  //console.log(auth)
  const bear = 'Bearer ' + auth.access_token;
  const response = await fetch('https://eu-west-1.aws.data.mongodb-api.com/app/data-zkogu/endpoint/data/v1/action/find', {
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
      filter: {}
    })
  });
  const data = await response.json();
  console.log(data)
  let parts = [];
  for (let i = 0; i < data.documents.length; i++) {
    if (data.documents[i].name !== undefined) {
      parts[data.documents[i].id] = data.documents[i].name;
    } else {
      parts[data.documents[i].id] = '';
    }
  }
  console.log(parts);
  return parts;
}

