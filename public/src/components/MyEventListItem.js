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

      event_id: props.event_id,
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

  setStateInterested=(event_id, success)=>{

       return new Promise((resolve, reject)=>{
         this.setState((prevState)=>({
           event_id,
           // going: !prevState.going,
           interested: !prevState.interested
         }))
         resolve(success);
         reject('fail')
       })
  }


onHandleGoing=(x)=>{
  console.log(x);
 let a = this.setStateGoing(x)
 .then(()=>{
   console.log(this.state);
   // this.props.startEditMyEvent(x, this.state)

 })

}
onHandleInterest=(x)=>{
  console.log(x);
  let a = this.setStateInterested(x)
  .then(()=>{
    console.log(this.state);
    this.props.startEditMyEvent(x, this.state)
  })
}

  render(){
    console.log(this.props);
    return(
      <div className="row">
       {this.props.event_name} at {this.props.city}
        <button onClick={(e)=>{this.onHandleGoing(this.props.id)}} >
          {this.state.going ? 'going' : 'attend'}
        </button>
      { !this.state.going &&
         <button onClick={(e)=>{this.onHandleInterest(this.props.id)}} >
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
