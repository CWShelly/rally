export default (collection1,  collection2) =>{
let eventIdArr = [];

for(let i =0; i<collection2.length; i++){
  console.log(collection2[i].event_id);
  eventIdArr.push(collection2[i].event_id)
}
return eventIdArr

}
