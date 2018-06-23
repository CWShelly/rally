import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import { startSetEvents } from '../actions/events';
import uuidv4 from 'uuid/v4';
import compare from '../selectors/compare';
import filterByEventId from "../selectors/findById";
import sb3 from '../selectors/sb3'

export class EventList extends React.Component{

constructor(props){
  super(props);
  this.state={
    same: true
  }
}





render(){

if(this.props.events[this.props.events.length -1]){
    return(
      <div className="rowr">
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
  // console.log(state.events.length);
  for(let i = 0; i<state.events.length; i++){
    // console.log(i);
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
return state.events

// return sb3(state.events)
}
if(lastAddedEvent){
group()
}

const _group = group()
// console.log(state.events);
return{

    events: _group
}



}
const mapDispatchToProps = (dispatch, props)=>{


  return{
    // startSetEvents: ()=>{dispatch(startSetEvents())}
        startSetEvents: ()=>dispatch(startSetEvents())

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EventList);
