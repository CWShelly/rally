export default (collection1) =>{

let filtered = collection1.filter((collection)=>{
  return collection['creator_id'] !== localStorage.getItem('user_id')
})

return filtered;

}
