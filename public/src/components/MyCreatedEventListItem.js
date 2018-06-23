import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent, startRemoveEvent } from '../actions/events';
 import InterestedPartyListItem from './InterestedPartyListItem';

class MyCreatedEventListItem extends React.Component{

    render(){

      return(
    <div>
     <p>  {this.props.event_name}
     <Link className="btn btn-primary btn-xs"  to={`/editEvent/${this.props.id}`}>
      <span >Edit{' '}</span>
    </Link>
    {this.props.interested.map((x)=>{
      return <InterestedPartyListItem key={uuidv4()} { ...x} />
    })}


  </p>
   </div>
  )
}
}
const mapStateToProps=(state,props)=>{


  let people_interested =Object.keys(props.people_interested);
let filtered=()=>{
let arr = [];
  for(let i = 0; i<state._users.length; i++){
    for(let j=0; j<people_interested.length; j++){
      if(state._users[i].id === people_interested[j]){
        arr.push(state._users[i].profiles[Object.keys(state._users[i].profiles)[0] ])
      }
    }
  }
  return arr;
}

 

  return{
    interested:filtered()
  }
}
const mapDispatchToProps = (dispatch)=> ({
   startRemoveEvent: (data)=>dispatch(startRemoveEvent(data)),
   startEditEvent: (id, _event)=>dispatch(startEditEvent(id, _event))

})
export default connect(mapStateToProps, mapDispatchToProps)(MyCreatedEventListItem)
