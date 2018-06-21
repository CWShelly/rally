export default (events,  myevents) =>{
console.log('sb');
if(myevents.length >0){
  console.log(events[0])
  console.log(myevents[0]);
}
let myeventarr = [];
let theeventarr= []
let current;

for(let i =0; i<myevents.length; i++){
  myeventarr.push(myevents[i])
}

for(let j = 0; j<events.length; j++){
  for(let k = 0; k<myeventarr.length; k++){
   if(events[j].id == myeventarr[k].event_id){
      events[j].going = myeventarr[k].going;
      events[j].interested = myeventarr[k].interested;
      events[j].event_id = myeventarr[k].event_id
      console.log(events[j].event_id, myevents[k].event_id);
      events[j].myevent_id = myeventarr[k].id

     theeventarr.push(events[j])
   }

  }

}


return theeventarr


}
