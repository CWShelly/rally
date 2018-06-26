import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent, startSetMyEvents, startEditMyEvent, startRemoveMyEvent } from '../actions/myevents';
import { startEditEvent } from '../actions/events';
import findByEventId from '../selectors/findById';
import moment from 'moment';

const now = moment();
class EventListItem extends React.Component{

  constructor(props){

    super(props);
    this.state={
      event_id:'',
      going: props.going,
      interested: props.interested ? props.interested : false,
      goingArr:[],
      interestedArr: [],
      event_name: props.event_name,
      street_address:props.street_address,
      city:  props.city,
      _state: props._state,
      zip: props.zip,
      time: props.time,
      createdAt: props.createdAt,
     event_image: props.event_image,
     people_interested: props.people_interested || {},
     people_going: props.people_going|| {},
       creator_id: props.creator_id
    }
  }



  setEventIdGoing=(event_id, success)=>{

       return new Promise((resolve, reject)=>{
         this.setState((prevState)=>({
           event_id,
           going: !prevState.going,
           interested: false
         }))
         resolve(success);
         reject('fail')
       })
  }

    setEventIdInterested=(event_id, success)=>{
         return new Promise((resolve, reject)=>{
           this.setState((prevState)=>({
             event_id,
             interested: !prevState.interested,

           }))
           resolve(success);
           reject('fail')
         })
    }


  onHandleGoing=(id)=>{
    let a = this.setEventIdGoing(id);
    a.then( ()=>{
      if(this.state.people_interested[localStorage.getItem('user_id')] === undefined &&
      this.state.people_going[localStorage.getItem('user_id')] === undefined){
             localStorage.setItem('creator_id', this.props.creator_id)
                this.props.startAddMyEvent({
                 event_id:this.state.event_id,
                 going:this.state.going,
                 interested: this.state.interested,
                 createdAt:  moment().format('MMMM Do YYYY, h:mm:ss a')
               })
           let goingParty = {};
           goingParty[localStorage.getItem('user_id')] = this.state.giong ? true : false;
           this.setState((prevState)=>({
             people_going: Object.assign({}, goingParty, prevState.people_going)
           }))
      let theEvent=
      {  event_name: this.props.event_name,
        street_address:this.props.street_address,
        city:  this.props.city,
        _state:this. props._state,
        zip: this.props.zip,
        time: this.props.time,
        createdAt: this.props.createdAt,
        event_image: this.props.event_image,
        people_interested: this.state.people_interested,
        people_going: this.state.people_going,
        creator_id: this.props.creator_id}

         this.props.startEditEvent(this.props.id, theEvent)
         }
         else{
           let goingParty = {};
           goingParty[localStorage.getItem('user_id')] = this.state.going;
           let interestedParty={};
           interestedParty[localStorage.getItem('user_id')] = this.state.interested;


           this.setState((prevState)=>({
             people_going: Object.assign({}, prevState.people_going, goingParty),
             people_interested: Object.assign({}, prevState.people_interested, interestedParty),

           }))

           let theEvent=
             {  event_name: this.props.event_name,
               street_address:this.props.street_address,
               city:  this.props.city,
               _state:this. props._state,
               zip: this.props.zip,
               time: this.props.time,
               createdAt: this.props.createdAt,
              event_image: this.props.event_image,
              people_interested: this.state.people_interested,
              people_going: this.state.people_going,
                creator_id: this.props.creator_id}

           let myEvent ={
             event_id: this.state.event_id,
             going: this.state.going,
             interested: this.state.interested,
             createdAt: this.state.createdAt
           }
                this.props.startEditEvent(this.props.id, theEvent);
                this.props.startEditMyEvent(findByEventId(this.props.myEvents, id)[0].id, myEvent)
         }
          }
  )
  }

  onHandleInterest=(id)=>{
    let a = this.setEventIdInterested(id);
    a.then(()=>{
  if(this.state.people_interested[localStorage.getItem('user_id')] === undefined &&
  this.state.people_going[localStorage.getItem('user_id')] === undefined){

         localStorage.setItem('creator_id', this.props.creator_id)
            this.props.startAddMyEvent({
             event_id:this.state.event_id,
             going:this.state.going,
             interested: this.state.interested,
             createdAt:  moment().format('MMMM Do YYYY, h:mm:ss a')
           })
       let interestedParty = {};
       interestedParty[localStorage.getItem('user_id')] = this.state.interested

       this.setState((prevState)=>({
         people_interested: Object.assign({}, interestedParty, prevState.people_interested)
       }))


let theEvent=
  {  event_name: this.props.event_name,
    street_address:this.props.street_address,
    city:  this.props.city,
    _state:this. props._state,
    zip: this.props.zip,
    time: this.props.time,
    createdAt: this.props.createdAt,
   event_image: this.props.event_image,
   people_interested: this.state.people_interested,
   people_going: this.state.people_going,
     creator_id: this.props.creator_id}

     this.props.startEditEvent(this.props.id, theEvent)
     }
     else{

       let interestedParty = {};
       interestedParty[localStorage.getItem('user_id')] = this.state.interested

       this.setState((prevState)=>({
         people_interested: Object.assign({}, prevState.people_interested, interestedParty)
       }))



       let theEvent=
         {  event_name: this.props.event_name,
           street_address:this.props.street_address,
           city:  this.props.city,
           _state:this. props._state,
           zip: this.props.zip,
           time: this.props.time,
           createdAt: this.props.createdAt,
          event_image: this.props.event_image,
          people_interested: this.state.people_interested,
          people_going: this.state.people_going,
            creator_id: this.props.creator_id}


       let myEvent ={
         event_id: this.state.event_id,
         going: this.state.going,
         interested: this.state.interested,
         createdAt: this.state.createdAt
       }
     ;
            this.props.startEditEvent(this.props.id, theEvent);

            this.props.startEditMyEvent(findByEventId(this.props.myEvents, id)[0].id, myEvent)
     }
    })
  }




  render(){
console.log(this.props);
    return(
      <Fragment >
       <h2>{this.props.event_name}</h2>
       <div className="slug ml-4">
       {this.props.event_image ?
         <img className=" col-sm-12 event-image"
           src={this.props.event_image} />
           :

           <img className="col-sm-12 event-image"
             src='/leia.jpg' />
       }
        <p className="ml-4">Where:</p>
        <p className="ml-4">{this.props.street_address}</p>
        <p className="ml-4">{this.props.city}</p>
        <p className="ml-4">{this.props.zip}</p>
        <p className="ml-4">Date: {moment(this.props.createdAt).format('MMMM Do, YYYY')}</p>
        <p className="ml-4">Time: {this.props.time}</p>
          {this.props.url && <p className="ml-4"><a href={this.props.url}>{this.props.url} </a></p>}


         </div>
        <button   className={this.state.going ? "btn btn-primary btn-xs mb-2 mt-2 ml-4" :
        "btn btn-secondary btn-xs mb-2 mt-2 ml-4"}
        onClick={(e)=>{this.onHandleGoing(this.props.id)}} >{this.state.going ? 'going' : 'attend'}</button>
      { !this.state.going && <button
        className={this.state.interested ? "btn btn-info btn-xs mb-2 mt-2 " : "btn btn-secondary btn-xs mb-2 mt-2"}  onClick={(e)=>{this.onHandleInterest(this.props.id)}} >interested</button>
      }


      </Fragment>

    )
  }
}

const mapStateToProps =(state,props)=>{

  return{
    myEvents:state.myevents
  }
}

const mapDispatchToProps = (dispatch)=> ({
     startAddMyEvent: (_event)=> dispatch(startAddMyEvent(_event)),
    startSetMyEvents: ()=>dispatch(startSetMyEvents()),
     startEditMyEvent: (id, _event)=>dispatch(startEditMyEvent(id, _event)),
     startRemoveMyEvent: (data)=>dispatch(startRemoveMyEvent(data)),
     startEditEvent: (id, _event)=>dispatch(startEditEvent(id, _event))

})
export default connect(mapStateToProps, mapDispatchToProps)(EventListItem)
