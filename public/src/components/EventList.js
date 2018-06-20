import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import { startSetEvents } from '../actions/events';
import uuidv4 from 'uuid/v4';
import compare from '../selectors/compare';
import filterByEventId from "../selectors/findById";

export class EventList extends React.Component{

constructor(props){
  super(props);
  this.state={
    same: true
  }
}

componentDidMount(){
  this.props.startSetEvents()

}

componentDidUpdate(){
  console.log('updated');
}


render(){
console.log(this.props);
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
      loading ...
      </Fragment>
    )
  }
}

}




const mapStateToProps = (state, props)=>{

let lastAddedEvent = state.events[state.events.length -1];
// console.log(lastAddedEvent);
const group = ()=>{
  for(let i = 0; i<state.events.length; i++){
      if(state.myevents[i] && state.events[i].id === state.myevents[i].event_id){
        state.events[i].going = state.myevents[i].going;
        state.events[i].interested = state.myevents[i].interested
      }
      else{
        state.events[i].going = false
        state.events[i].interested = false
      }
  }
return state.events
}
if(lastAddedEvent){
  group()

}


return{

    events:state.events


}

// return events:state




}
const mapDispatchToProps = (dispatch, props)=>{


  return{
    startSetEvents: ()=>{dispatch(startSetEvents())}

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(EventList);
