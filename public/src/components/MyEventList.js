import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MyEventListItem from './MyEventListItem';
import MyCreatedEventListItem from './MyCreatedEventListItem';
import { startSetMyEvents } from '../actions/myevents';
import uuidv4 from 'uuid/v4';
import getEvents from '../selectors/getEventsById';
import sb from '../selectors/sb';
import sb2 from '../selectors/sb2';
import interested from '../selectors/interested';


export class MyEventList extends React.Component{

 render(){

   return(
     <div  className="row" >
     <div className="col-sm-12 col-md-6" >
     {this.props.events.length > 0 ? <h1>Attending or Interested:</h1> : ''}
      {this.props.events.map((_event)=>{
        return <MyEventListItem key={_event.id}   { ..._event} />
      })}
      </div>

    <div className="col-sm-12 col-md-6 ">
      {this.props.eventsICreated.length > 0 &&
         <h1>Events I created:</h1>}

      {this.props.eventsICreated.map((_event)=>{

        return <MyCreatedEventListItem key={_event.id}   { ..._event} />
      })}
   </div>

      </div>
   )
 }

}

const mapStateToProps = (state, props)=>{
console.log(state);
const eventsICreated = sb2(state.events, localStorage.getItem('user_id'));
const eventsImInterestedGoing = sb(state.events, state.myevents);

let filtered = ()=>{
  for (let i =0; i<eventsICreated.length; i++){
   interested(eventsICreated[i].people_interested);
   interested(eventsICreated[i].people_going)


  }
  return eventsICreated;
}
// console.log(filtered());
return{
  events: eventsImInterestedGoing,
  eventsICreated:filtered(),
  myevents: state.myevents
}


}

const mapDispatchToProps = (dispatch, props)=>{

  return{
    startSetMyEvents: ()=>{dispatch(startSetMyEvents())}
  // startSetMyEvents: ()=>dispatch(startSetMyEvents()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyEventList);
