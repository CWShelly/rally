
 import React from 'react';
 import { connect } from 'react-redux';
 import ProfileForm from './ProfileForm';
 import { startEditProfile } from '../actions/profiles';




 export class EditProfile extends React.Component{
   constructor(props){
     super(props);
     this.state={
       buttonText: 'Edit Profile'

     }
   }

   onSubmit=(profile)=>{

   this.props.startEditProfile(this.props.profile.id, profile);
   this.props.history.push('/');
}

  render(){


    return (
      <div>

      {this.props.profile.profile_image &&
         <img  src={this.props.profile.profile_image}  />}
       <ProfileForm
       profile={this.props.profile}

       buttonText={this.state.buttonText}

       onSubmit={
        this.onSubmit}
       />


      </div>
    )
  }
 }


 const mapStateToProps = (state, props)=>{
console.log(state);
  return {
    profile: state.profiles[0],

  }
}

const mapDispatchToProps = (dispatch, props) => {

  return{
    startEditProfile:(id, profile)=> dispatch(startEditProfile(id, profile)),


  }

}




 export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
