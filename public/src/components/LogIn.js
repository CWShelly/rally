import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import { Link } from 'react-router-dom';

 export const LogIn =({ startLogin })=>(


   <div  >

       <p> Rally
       </p>

      <button onClick={startLogin}>Enter</button>


   </div>


 );

 const mapDispatchToProps = (dispatch) =>({
   startLogin: ()=>dispatch(startLogin())
 });

 export default connect(undefined, mapDispatchToProps)(LogIn);
