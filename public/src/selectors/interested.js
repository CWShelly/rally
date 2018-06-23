export default (interested) =>{

console.log(interested);

let the_interested = ()=>{
 let keys_arr = Object.keys(interested);

 for(let i in interested){
   if(!interested[i]){
     delete interested[i]
   }
 }

 return interested
}


return the_interested();
}
