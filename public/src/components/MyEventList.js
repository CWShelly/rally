import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MyEventListItem from './MyEventListItem';
import MyCreatedEventListItem from './MyCreatedEventListItem';
import { startSetMyEvents } from '../actions/myevents';
import uuidv4 from 'uuid/v4';
import getEvents from '../selectors/getEventsById';
import sb from '../selectors/sb';
import sb2 from '../selectors/sb2'

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

console.log(this.props.eventsICreated);
   return(
     <div >
     {this.props.events.length > 0 ? <h1>Events that I am either attending or interested in</h1> : ''}
      {this.props.events.map((_event)=>{

        return <MyEventListItem key={_event.id}   { ..._event} />
      })}

      {this.props.eventsICreated.length > 0 && <h1>Events I created</h1>}

      {this.props.eventsICreated.map((_event)=>{

        return <MyCreatedEventListItem key={_event.id}   { ..._event} />
      })}


      </div>
   )
 }

}


const mapStateToProps = (state, props)=>{

return{
  events:sb(state.events, state.myevents),
  eventsICreated: sb2(state.events, localStorage.getItem('user_id')),
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
