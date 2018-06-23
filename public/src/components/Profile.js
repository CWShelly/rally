

import React from 'react';
import AddProfile from './AddProfile';

import { startAddProfile } from '../actions/profiles';
import { getUsers } from '../actions/users';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Profile extends React.Component{

constructor(props){
  super(props);
  this.state={

  }
}

  onSubmit=(profile)=>{
     this.props.startAddProfile(profile);
     this.props.history.push(`/`)
  }



  displayAddNote =()=>{
    this.setState((prevState)=>({
      display: !prevState.display
    }))
  }

componentDidMount(){

 if(this.props.profile){
    localStorage.setItem('browse_id', this.props.profile.user_id)
 }

}


render(){

  return(
    <div>

         {!this.props.profile &&
           <AddProfile history={this.props.history}/>}

          {this.props.profile &&

             <div className="row testRow" >
                {
                  this.props.profile &&
                <div className="col-sm-12 col-md-6 mt-4">
                   <p>{this.props.profile.user_name}</p>
                   <p>Bio: {this.props.profile.user_bio}</p>
                   <p>Location: {this.props.profile.user_location}</p>
                   <Link  to={`/editProfile/${this.props.profile.id}`}>
                   <span  >Edit{' '}</span><i className="fa fa-wrench"></i>
                   </Link>
               </div>
            }

                    {this.props.profile.profile_image &&
                      <div className="col-sm-12 col-md-6 mr-auto">
                     <img className="profile-image mt-4 mb-4"
                     src={this.props.profile.profile_image} />
                     </div>

                   }
          </div>

    }
     </div>

  )
}
}


const mapStateToProps = (state)=>{


    if(state.profiles){
          return {
           profile: state.profiles[0],
          }
    }
    else{
      return{
        profile: []
      }
    }

}

const mapDispatchToProps = (dispatch)=> ({
     startAddProfile: (profile)=> dispatch(startAddProfile(profile)),
     // getUsers: dispatch(getUsers())
})



 export default connect(mapStateToProps, mapDispatchToProps)(Profile);
