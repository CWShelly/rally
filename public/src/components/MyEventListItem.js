import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import { startAddMyEvent } from '../actions/myevents'


class MyEventListItem extends React.Component{



  render(){
     
    return(
      <div className="row">



      </div>

    )
  }
}

const mapDispatchToProps = (dispatch)=> ({
     startAddMyEvent: (_event)=> dispatch(startAddMyEvent(_event))
})
export default connect(undefined, mapDispatchToProps)(MyEventListItem)
// export default EventListItem;
