

let count = 0;
let someId="my id"
const addOne = () =>{
    count++;
   renderCA();


}

const minusOne = () =>{
  // console.log('minus one');
  count--;
  renderCA();
}
const reset = () =>{
  console.log('reset');
   count =0;
     renderCA();
}



const renderCA = () =>{
  const template2 =(
    <div>
      <h1>Count:{count}</h1>
      <button onClick={addOne}  className= "button">+1</button>
      <button onClick={minusOne}  className= "button">-1</button>
      <button onClick={reset}   className= "button">reset</button>
    </div>


  )
ReactDOM.render(template2, appRoot);
}

renderCA();
