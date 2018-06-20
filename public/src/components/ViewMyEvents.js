import React from 'react';
import MyEventList from './MyEventList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import BookList from './BookList'

export class ViewMyEvents extends React.Component{

  state = {

  }


render(){

  return(
    <div className="container" >
     <MyEventList />
     </div>

  )
}
}


const mapDispatchToProps = (dispatch)=> ({
     // startAddNote: (note)=> dispatch(startAddNote(note))
})


export default connect(undefined, mapDispatchToProps)(ViewMyEvents)
