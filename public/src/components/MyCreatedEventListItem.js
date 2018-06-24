import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent, startRemoveEvent } from '../actions/events';
 import InterestedPartyListItem from './InterestedPartyListItem';
 import GoingPartyListItem from './GoingPartyListItem';

class MyCreatedEventListItem extends React.Component{

    render(){

      return(

     <Fragment>
<div className="col-md-12">
     <h2 >{this.props.event_name}</h2>
     <p  ><Link className="btn btn-primary btn-xs "
      to={`/editEvent/${this.props.id}`}>
      <span >Edit{' '}</span>
    </Link></p>
</div>

    <div className="ml-4 mt-2 slug">
    <h6 className="ml-4">{this.props.interested.length} Interested</h6>
    {this.props.interested.map((x)=>{
      return <InterestedPartyListItem key={uuidv4()} { ...x} />
    })}
     <h6 className="ml-4">{this.props.going.length} Going</h6>
    {this.props.going.map((x)=>{
      return <GoingPartyListItem key={uuidv4()} { ...x} />
    })}
</div>
  </Fragment>

  )
}
}
const mapStateToProps=(state,props)=>{
  console.log(props);
  let people_interested =Object.keys(props.people_interested);
  let people_going=Object.keys(props.people_going)
let filtered=()=>{
let arr = [];
  for(let i = 0; i<state._users.length; i++){
    for(let j=0; j<people_interested.length; j++){
      if(state._users[i].id === people_interested[j]){
        console.log(i,j);
        arr.push(state._users[i].profiles[Object.keys(state._users[i].profiles)[0] ])
      }
    }
  }
  return arr;
}

let going=()=>{
  let arr = [];
  for(let i = 0; i<state._users.length; i++){
    for(let j=0; j<people_going.length; j++){
      if(state._users[i].id === people_going[j]){
        arr.push(state._users[i].profiles[Object.keys(state._users[i].profiles)[0] ])
      }
    }
  }
  return arr;

}


  return{
    interested:filtered(),
    going: going()
  }
}
const mapDispatchToProps = (dispatch)=> ({
   startRemoveEvent: (data)=>dispatch(startRemoveEvent(data)),
   startEditEvent: (id, _event)=>dispatch(startEditEvent(id, _event))

})
export default connect(mapStateToProps, mapDispatchToProps)(MyCreatedEventListItem)
