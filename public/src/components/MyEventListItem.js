import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent } from '../actions/events';


class MyEventListItem extends React.Component{

  constructor(props){

    super(props);
    console.log(props);
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
           going: !prevState.going,
           interested: false
         }))
         console.log(this.state);
         resolve(success);
         reject('fail')
       })
  }

  setStateInterested=(event_id, success)=>{
       return new Promise((resolve, reject)=>{
         this.setState((prevState)=>({
           interested: !prevState.interested
         }))
         resolve(success);
         reject('fail')
       })
  }


onHandleGoing=(x)=>{
  console.log('handle going');
  console.log('myevent_id: ', x);
     console.log(this.state);

 let a = this.setStateGoing(x)
 .then(()=>{
   console.log('handle going state');
   console.log(this.state);
       console.log(this.props);
   this.props.startEditMyEvent(x, this.state)

 })


}
onHandleInterest=(x)=>{
  console.log('myevent_id: ', x);
    console.log(this.props);
  let a = this.setStateInterested(x)
  .then(()=>{
    console.log(this.props);
    console.log(this.state);
    this.props.startEditMyEvent(x, this.state)
  })
}

onComponentDidMount(){
  console.log(' my event list item mounted');
  console.log(this.state);
}
onComponentDidUpdate(){
  console.log('my event list item updated');
      console.log(this.state);
}

onHandleRemove=()=>{
 
  this.props.startRemoveMyEvent({id: this.props.myevent_id})
}

  render(){

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
      <button onClick={this.onHandleRemove} >
        Delete
      </button>
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
