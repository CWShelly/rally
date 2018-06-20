export default (collection1,  collection2) =>{
let eventIdArr = [];
let theeventarr= []
let current;
// for(let i =0; i<collection2.length; i++){
//   eventIdArr.push(collection2[i].event_id)
// }

for(let i =0; i<collection2.length; i++){
  eventIdArr.push(collection2[i])
}

for(let j = 0; j<collection1.length; j++){
  for(let k = 0; k<eventIdArr.length; k++){
   if(collection1[j].id == eventIdArr[k].event_id){
     console.log(eventIdArr[k]);
      collection1[j].going = eventIdArr[k].going;
      collection1[j].interested = eventIdArr[k].interested;
      collection1[j].myevent_id = eventIdArr[k].id

     theeventarr.push(collection1[j])
   }
  }

}


return theeventarr

}
