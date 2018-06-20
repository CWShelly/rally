export default (collection,  event_id) =>{


const filtered = collection.filter((_collection)=>{

   return _collection['id'] === event_id


 })

 return filtered


}
