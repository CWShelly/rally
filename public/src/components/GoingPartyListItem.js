import React, { Fragment } from 'react';

export default class GoingPartyListItem extends React.Component{
  render(){
    console.log(this.props);
  return(
    <li>
    {this.props.user_name}. {this.props.user_bio}. {this.props.user_location}
    </li>
  )
  }
}
