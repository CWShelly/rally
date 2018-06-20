import React from 'react';
// import UserList from './UserList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventList from './EventList'

export class ViewEvents extends React.Component{

  state = {

  }


render(){
// console.log(this.props);
  return(
    <div className="container">

<EventList />
     </div>

  )
}
}


const mapDispatchToProps = (dispatch)=> ({
     // startAddNote: (note)=> dispatch(startAddNote(note))
})


export default connect(undefined, mapDispatchToProps)(ViewEvents)
