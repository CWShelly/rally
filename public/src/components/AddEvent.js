import React from 'react';
import { connect } from 'react-redux';
import { startAddEvent, startSetEvents } from '../actions/events';
import EventForm from './EventForm';


export class AddEvent extends React.Component{

 onSubmit=(_event)=>{
   console.log(_event);
let a = this.beforeSubmit(_event)

     this.props.startSetEvents()

  }

  beforeSubmit = (_event, x)=>{
    return new Promise((resolve, reject)=>{
      this.props.startAddEvent(_event);
         this.props.history.push('/')
    })
    resolve(x);
    reject('fail')
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
      // startSetEvents: ()=>{dispatch(startSetEvents())}
      startSetEvents:()=>dispatch(startSetEvents())
})
export default connect(undefined, mapDispatchToProps)(AddEvent)
