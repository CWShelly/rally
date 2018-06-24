import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import { startSetEvents } from '../actions/events';
import uuidv4 from 'uuid/v4';
import compare from '../selectors/compare';
import filterByEventId from "../selectors/findById";
import sb3 from '../selectors/sb3';
import { Redirect } from 'react-router-dom';

export class EventList extends React.Component{


render(){
console.log(this.props.profiles);
if(this.props.profiles === undefined || this.props.profiles.length === 0){
  return <Redirect to="/myprofile"/>
}
else if(this.props.events[this.props.events.length -1]){
    return(
      <div  >
       {this.props.events.map((_event)=>{
         return <EventListItem key={_event.id}  going={_event.going} interested={_event.interested}   { ..._event} />
       })}
       </div>
    )
  }

  else{
    return(
      <Fragment>

      </Fragment>
    )
  }
}

}




const mapStateToProps = (state, props)=>{
console.log(state);
let lastAddedEvent = state.events[state.events.length -1];

const group = ()=>{

  for(let i = 0; i<state.events.length; i++){

      if(state.myevents[i] && state.events[i].id === state.myevents[i].event_id ){
        state.events[i].going = state.myevents[i].going;
        state.events[i].interested = state.myevents[i].interested
      }
      else if(state.events[i].creator_id === localStorage.getItem('user_id')){
         // console.log(state.events[i]);
        state.events[i].going = true;
        state.events[i].interested = true;

      }
      else{
        state.events[i].going = false
        state.events[i].interested = false
      }
  }

return sb3(state.events)
}

return{

    events: group(),
    profiles: state.profiles
}



}
const mapDispatchToProps = (dispatch, props)=>{


  return{
    // startSetEvents: ()=>{dispatch(startSetEvents())}
        startSetEvents: ()=>dispatch(startSetEvents())

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EventList);
