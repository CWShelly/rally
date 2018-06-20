import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MyEventListItem from './MyEventListItem';
import { startSetMyEvents } from '../actions/myevents';
import uuidv4 from 'uuid/v4';
import getEvents from '../selectors/getEventsById';
import sb from '../selectors/sb'

export class MyEventList extends React.Component{

constructor(props){
  super(props);
  this.state={

  }
}

componentDidMount(){
  this.props.startSetMyEvents()
}

componentDidUpdate(){
  console.log('updated');
}

 render(){


   return(
     <Fragment>
      {this.props.events.map((_event)=>{
       
        return <MyEventListItem key={_event.id}   { ..._event} />
      })}
      </Fragment>
   )
 }

}


const mapStateToProps = (state, props)=>{
console.log(state.myevents);

const group = ()=>{

}


return{
  events:sb(state.events, state.myevents),
  myevents: state.myevents

}



// console.log(state);
 console.log(sb(state.events, state.myevents));


}

const mapDispatchToProps = (dispatch, props)=>{

  return{
    // startSetMyEvents: ()=>{dispatch(startSetMyEvents())}
  startSetMyEvents: ()=>dispatch(startSetMyEvents()),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyEventList);
