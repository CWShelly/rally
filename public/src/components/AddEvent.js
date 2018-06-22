import React from 'react';
import { connect } from 'react-redux';
import { startAddEvent, startSetEvents } from '../actions/events';
import { startAddMyEvent } from '../actions/myevents'
import EventForm from './EventForm';


export class AddEvent extends React.Component{

 onSubmit=(_event)=>{


   let a = Promise.resolve(this.props.startAddEvent(_event))
   console.log(a);
   a.then(( )=>{
     console.log(localStorage.getItem('just_created_event_id'));
     this.props.startAddMyEvent({
       event_id: localStorage.getItem("just_created_event_id"),
       going: true,
       interested: true,
       createdAt: 0
     })

   })
   .catch((err)=>{
     console.log("err: " , err);
   })
    .then(()=>{
   
           this.props.startSetEvents()
           this.props.history.push('/')

    })
    .catch((err)=>{
      console.log("err: " , err);
    })

  }


  render(){

    return (

       <EventForm
         onSubmit={this.onSubmit}
       />

    )
  }
}



const mapDispatchToProps = (dispatch)=> ({
     startAddEvent: (_event)=> dispatch(startAddEvent(_event)),
     startAddMyEvent: (_event)=> dispatch(startAddMyEvent(_event)),
      // startSetEvents: ()=>{dispatch(startSetEvents())}
      startSetEvents:()=>dispatch(startSetEvents())
})
export default connect(undefined, mapDispatchToProps)(AddEvent)
