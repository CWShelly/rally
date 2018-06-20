import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MyEventListItem from './MyEventListItem';
import { startSetMyEvents } from '../actions/myevents';
import uuidv4 from 'uuid/v4';

export class MyEventList extends React.Component{

constructor(props){
  super(props);
  this.state={
    same: true
  }
}

componentDidMount(){
  this.props.startSetMyEvents()
}


 render(){
console.log(this.props);
   return(
     <Fragment>


      {this.props.events.map((_event)=>{
        return <MyEventListItem key={uuidv4()}   { ..._event} />
      })}

      </Fragment>

   )
 }

}


const mapStateToProps = (state, props)=>{
  console.log(state);
// console.log(state.events);

return{

    events:state.events,


}





}
const mapDispatchToProps = (dispatch, props)=>{


  return{
    startSetMyEvents: ()=>{dispatch(startSetMyEvents())}

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyEventList);
