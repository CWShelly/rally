import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { Jumbotron, Container } from 'reactstrap'



export class Header extends React.Component{

  state={
    user_info:JSON.parse(localStorage.getItem(`firebase:authUser:${process.env.FIREBASE_API_KEY}:[DEFAULT]`))

  }


  render(){

    return(


      <Fragment>
      <Container fluid>
            <div className="row">
                  <div className="col ml-2">
                    <h1>Rally</h1>
                    <p>{this.state.user_info.displayName ? this.state.user_info.displayName : 'for readers'}</p>
                  </div>

                     <nav className="navbar navbar-expand navbar nav-bg">
                     <div className="collapse navbar-collapse" id="navbarSupportedContent">

                       <ul className="navbar-nav ml-auto mr-4">
                         <li className="nav-item">
                           <NavLink  to="/events" activeClassName="is-active"  className="nav-link">Home</NavLink>
                         </li>
                         <li className="nav-item">
                           <NavLink to="/myevents" className="nav-link">My Events</NavLink>
                         </li>
                         <li className="nav-item">
                           <NavLink to="/myprofile" className="nav-link">My Profile</NavLink>
                         </li>

                         <li className="nav-item">
                           <NavLink to="/addevent" className="nav-link">Post Event</NavLink>
                         </li>
                         <li className="nav-item">
                           <a onClick={this.props.startLogout} className="nav-link">Logout</a>
                         </li>
                       </ul>
                     </div>

                     </nav>


</div>


  <Jumbotron className="JumboHeaderImg">


        <h1 className="display-4">events stuff</h1>
        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel aperiam repellat ad doloribus aspernatur
         ex nobis nam porro magni qui provident sit nisi, ut dolore sapiente alias dignissimos assumenda cum.</p>
       <p className="lead">
        <a className="btn btn-primary btn-lg" href="#" role="button"> Learn More</a>
      </p>

 </Jumbotron>

</Container>
 </Fragment>


    )
  }
}

const mapDispatchToProps  = (dispatch)=>({
startLogout: ()=> dispatch(startLogout())
})
export default connect(undefined, mapDispatchToProps)(Header);
