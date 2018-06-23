export default (collection1,  creatorID) =>{

 
let filtered = collection1.filter((collection)=>{
  return collection['creator_id'] === creatorID
})

return filtered;
}
