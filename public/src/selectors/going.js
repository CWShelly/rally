export default (going) =>{

console.log(going);

let the_going = ()=>{
 let keys_arr = Object.keys(going);

 for(let i in going){
   if(!going[i]){
     delete going[i]
   }
 }

 return going
}


return the_going();
}
