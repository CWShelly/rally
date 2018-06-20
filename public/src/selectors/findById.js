export default (collection,  event_id) =>{
// console.log(collection, event_id);
// let hasTags = (tag_keys, obj)=>obj.tag_keys.includes(tag);
// console.log(hasTags);


const filtered = collection.filter((_collection)=>{

   return _collection['event_id'] === event_id


 })

 return filtered


}
