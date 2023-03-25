const baseURl = 'https://storage.googleapis.com/part_diagrams/99NB';


export async function getImageUrl(id) {
  const filename = id.concat('.jpg');
  const url = baseURl.concat('/', filename);
  return url;
}