import React from 'react';
import { connect } from 'react-redux';
import { startAddProfile } from '../actions/profiles';
import ProfileForm from './ProfileForm';


export class AddProfile extends React.Component{

 onSubmit=(profile)=>{

     this.props.startAddProfile(profile);
     this.props.history.push('/')
  }

  render(){

    return (

       <ProfileForm
         onSubmit={this.onSubmit}
       />

    )
  }
}



const mapDispatchToProps = (dispatch)=> ({
     startAddProfile: (profile)=> dispatch(startAddProfile(profile))
})
export default connect(undefined, mapDispatchToProps)(AddProfile)
