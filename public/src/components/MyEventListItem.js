import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent } from '../actions/events';


class MyEventListItem extends React.Component{

  constructor(props){
    super(props);
    this.state={
      id: props.id,
      event_id: props.myevent_id,
      going: props.going,
      interested: props.interested,
      createdAt: props.createdAt
    }
  }
  setStateGoing=(event_id, success)=>{

       return new Promise((resolve, reject)=>{
         this.setState((prevState)=>({
           event_id,
           going: !prevState.going,
           interested: true ? false : false
         }))
         resolve(success);
         reject('fail')
       })
  }

  setStateGoing=(event_id, success)=>{

       return new Promise((resolve, reject)=>{
         this.setState((prevState)=>({
           event_id,
           going: !prevState.going,
           // interested: !prevState.interested
         }))
         resolve(success);
         reject('fail')
       })
  }


onHandleGoing=(event_id)=>{
 let a = this.setStateGoing(event_id)
 .then(()=>{
   console.log(this.state);
   this.props.startEditMyEvent(event_id, this.state)
 })

}
onHandleInterest=(id)=>{
  let a = this.setStateInterested(event_id)
  .then(()=>{
    this.props.startEditMyEvent(id, this.state)
  })
}

  render(){
    console.log(this.props);
    return(
      <div className="row">
       {this.props.event_name} at {this.props.city}
        <button onClick={(e)=>{this.onHandleGoing(this.props.myevent_id)}} >
          {this.state.going ? 'going' : 'attend'}
        </button>
      { !this.state.going &&
         <button onClick={(e)=>{this.onHandleInterest(this.props.myevent_id)}} >
          {this.state.interested ? 'interested: y' : 'interested?'}
         </button>
      }
      </div>

    )
  }
}



const mapDispatchToProps = (dispatch)=> ({
  startSetMyEvents: ()=>dispatch(startSetMyEvents()),
   startEditMyEvent: (id, _event)=>dispatch(startEditMyEvent(id, _event)),
   startRemoveMyEvent: (data)=>dispatch(startRemoveMyEvent(data)),
   startEditEvent: (id, _event)=>dispatch(startEditEvent(id, _event))

})
export default connect(undefined, mapDispatchToProps)(MyEventListItem)
