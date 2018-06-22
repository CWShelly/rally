
 import React from 'react';
 import { connect } from 'react-redux';
 import EventForm from './EventForm';
 import { startEditEvent, startRemoveEvent } from '../actions/events';





 export class EditEvent extends React.Component{


   onSubmit=(data)=>{
   this.props.startEditEvent(this.props._event.id, data);
   this.props.history.push('/');
}


onRemove=() => {
  this.props.startRemoveEvent({id: this.props._event.id})
   this.props.history.push('/')
}





  render(){

console.log(this.props);
    return (
      <div>
       <EventForm
       _event={this.props._event}
       events={this.props.events}


       onSubmit={
        this.onSubmit}
       />


  <button className="btn btn-danger btn-xs" onClick={this.onRemove}>Delete</button>

      </div>
    )
  }
 }


 const mapStateToProps = (state, props)=>{
console.log(state);
  return {
    _event: state.events.find((data)=>data.id === props.match.params.id),
    events: state.events.filter((data)=> data.id !== data),



  }
}

const mapDispatchToProps = (dispatch, props) => {

  return{
    startEditEvent:(id, data)=> dispatch(startEditEvent(id, data)),
    startRemoveEvent: (data)=> dispatch(startRemoveEvent(data)),



  }

}




 export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
