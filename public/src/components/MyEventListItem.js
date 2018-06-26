import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent } from '../actions/events';
import moment from 'moment';

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
           going: !prevState.going,
           interested: false
         }))

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


 let a = this.setStateGoing(x)
 .then(()=>{

   this.props.startEditMyEvent(x, this.state)

 })


}
onHandleInterest=(x)=>{

  let a = this.setStateInterested(x)
  .then(()=>{

    this.props.startEditMyEvent(x, this.state)
  })
}


onHandleRemove=()=>{

  this.props.startRemoveMyEvent({id: this.props.myevent_id})
}

  render(){
console.log(this.props);
    return(
      <Fragment >
      {this.props.event_image ?
        <img className=" col-sm-12 event-image"
          src={this.props.event_image} />
          :

          <img className="col-sm-12 event-image"
            src='/leia.jpg' />
      }
       <h2>{this.props.event_name}</h2>
       <div className="ml-4 slug">
       <p className="ml-4">Where:{this.props.city}</p>
        <p className="ml-4">Date: {moment(this.props.createdAt).format('MMMM Do, YYYY')}</p>
        <p className="ml-4">Time: {this.props.time}</p>
        <p className="ml-4">About: {this.props.note}</p>
        {this.props.url &&<p className="ml-4"> <a href={this.props.url}>{this.props.url} </a></p>}
        </div>
    <div >
        <button className={this.state.going ?
          "btn btn-success btn-xs mb-2  mt-2" : "btn btn-secondary btn-xs"}
          onClick={(e)=>{this.onHandleGoing(this.props.myevent_id)}} >
          {this.state.going ? 'going' : 'attend'}
        </button>
      { !this.state.going &&
         <button  className={this.state.interested ?
           "btn btn-info btn-xs" : "btn btn-secondary btn-xs mb-2  mt-2"}
           onClick={(e)=>{this.onHandleInterest(this.props.myevent_id)}} >
          {this.state.interested ? 'interested' : 'interested?'}
         </button>
      }
      <button className={"btn btn-danger btn-xs mt-2 mb-2 "} onClick={this.onHandleRemove} >
        Delete
      </button>
      </div>


      </Fragment>

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
