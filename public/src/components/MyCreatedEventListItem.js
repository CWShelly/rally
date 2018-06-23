import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent, startRemoveEvent } from '../actions/events';


class MyCreatedEventListItem extends React.Component{



render(){
 
  return(
<div>
 <p>  {this.props.event_name}
 <Link className="btn btn-primary btn-xs"  to={`/editEvent/${this.props.id}`}>
  <span >Edit{' '}</span>
</Link>

  </p>
   </div>
  )
}
}
const mapDispatchToProps = (dispatch)=> ({


   startRemoveEvent: (data)=>dispatch(startRemoveEvent(data)),
   startEditEvent: (id, _event)=>dispatch(startEditEvent(id, _event))

})
export default connect(undefined, mapDispatchToProps)(MyCreatedEventListItem)
