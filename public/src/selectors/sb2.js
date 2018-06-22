export default (collection1,  creatorID) =>{
  console.log(collection1);
  console.log(creatorID);

let filtered = collection1.filter((collection)=>{
  return collection['creator_id'] === creatorID
})

return filtered;
}
