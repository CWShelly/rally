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
      id: ''
    }
  }

 onSubmit=(_event)=>{
   // console.log(this.props.startAddEvent(_event));

   let a = Promise.resolve(this.props.startAddEvent(_event))



   a.then(()=>{

     setTimeout(()=>{
       console.log('yes');
         console.log(response['key']);
         this.props.startAddMyEvent({
           event_id: response.key,
           going: true,
           interested: true,
             createdAt:  moment().format('MMMM Do YYYY, h:mm:ss a')
         })
     }, 500)
   })


    .then(()=>{


      console.log(response);
      console.log(response['key']);

         })

   // })


//    .then(()=>{
//      this.props.startAddMyEvent({
//        event_id: this.state.id,
//        going: true,
//        interested: true,
//          createdAt:  moment().format('MMMM Do YYYY, h:mm:ss a')
//      })
//    })
//     .then(()=>{
//
//            // this.props.startSetEvents()
//            this.props.history.push('/events')
//            // this.props.history.push('/myevents')
//
//     })
//     .catch((err)=>{
//       console.log("err: " , err);
//     })

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
