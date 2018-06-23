import React from 'react';
import { connect } from 'react-redux';
import { startAddEvent, startSetEvents, response} from '../actions/events';
import { startAddMyEvent } from '../actions/myevents'
import EventForm from './EventForm';

import moment from 'moment';

const now = moment();
export class AddEvent extends React.Component{

  constructor(props){
    super(props);
    this.state={
      time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      interval:'',
      count: 0,
      id: '',


    }
  }

  thing = ()=>{
    console.log('thing');
    this.setState(( )=>({
      interval: setInterval(this.message, 500),

    }))
  }


  message = ()=>{
    console.log('helllo!', response.key);

    this.setState((prevState)=>({
      count: prevState.count++
    }))

    if(response.key !== '' || !undefined && this.state.count <5){
      this.setState((prevState)=>({
        interval: clearInterval(prevState.interval)
      }));

      this.props.startAddMyEvent({
        event_id: response.key,
        going: true,
        interested: true,
        createdAt:  moment().format('MMMM Do YYYY, h:mm:ss a')
      })
  }
  else if(this.state.count === 5){
    this.setState((prevState)=>({
      interval: clearInterval(prevState.interval)
    }));
  }


}



 onSubmit=(_event)=>{

   let a = Promise.resolve(this.props.startAddEvent(_event))

   a.then(()=>{
   this.thing()

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
     startAddMyEvent: (data)=> dispatch(startAddMyEvent(data)),
      // startSetEvents: ()=>{dispatch(startSetEvents())}
      startSetEvents:()=>dispatch(startSetEvents())
})
export default connect(undefined, mapDispatchToProps)(AddEvent)
