import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MyEventListItem from './MyEventListItem';
import { startSetMyEvents } from '../actions/myevents';
import uuidv4 from 'uuid/v4';
import getEvents from '../selectors/getEventsById';
import sb from '../selectors/sb'

export class MyEventList extends React.Component{

constructor(props){
  super(props);
  this.state={

  }
}

componentDidMount(){
  this.props.startSetMyEvents()
}


 render(){
// console.log(this.props);
   return(
     <Fragment>


      {this.props.events.map((_event)=>{
        return <MyEventListItem key={uuidv4()}   { ..._event} />
      })}
   


      </Fragment>

   )
 }

}


const mapStateToProps = (state, props)=>{
console.log(state.myevents);


if(state.myevents.length>0){
  let lastAddedEvent = state.myevents[state.myevents.length -1];
}

//
// const group = ()=>{
//   for(let i = 0; i<state.events.length; i++){
//       if(state.myevents[i] && state.events[i].id === state.myevents[i].event_id){
//         state.events[i].going = state.myevents[i].going;
//         state.events[i].interested = state.myevents[i].interested
//       }
//       else{
//         state.events[i].going = false
//         state.events[i].interested = false
//       }
//   }
// return state.events
// }
// if(lastAddedEvent){
//   group()
//
// }
      return{
          events:sb(state.events, state.myevents),
          myevents: state.myevents

      }

}

const mapDispatchToProps = (dispatch, props)=>{

  return{
    startSetMyEvents: ()=>{dispatch(startSetMyEvents())}

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyEventList);
