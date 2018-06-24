import React, { Fragment } from 'react';

export default class GoingPartyListItem extends React.Component{
  render(){
    console.log(this.props);
  return(
    <p className="ml-4">
    {this.props.user_name}. {this.props.user_bio}. {this.props.user_location}
    {this.props.user_id === localStorage.getItem('user_id') &&
    <span className="text-primary "> *you*</span>}
    </p>
  )
  }
}
