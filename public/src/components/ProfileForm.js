import React from 'react';
import moment from 'moment';
import { storage } from '../firebase/firebase';


export default class ProfileForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
      user_name: props.profile ? props.profile.user_name : '',
      user_bio:props.profile ? props.profile.user_bio : '',
      user_location:  props.profile ? props.profile.user_location : '',
      createdAt: props.profile ? moment(): moment(),
      error: '',
      profile_image: props.profile ? props.profile.profile_image : '',
      input: '',
      interestsArr: props.profile ? Object.keys(props.profile.tags) : [],
      interests: props.profile ? props.profile.interests : {},
      tags: props.profile ? props.profile.tags : {},
      progress: 0,
      file: ''

    }
  }



  hasSet=(x)=>{
    return new Promise((resolve,reject)=>{
      let arr = this.state.interestsArr.reduce((collection, item)=>{
        collection[item]=true
        return collection
      },{});
     this.setState((prevState)=>({
       interests: arr,
       tags: arr
     }))

     resolve(x)
     reject('failure')

    })
  }

setPic =(e,x)=>{
  return new Promise((resolve, reject)=>{
    let file = e.target.files[0];
    console.log(e.target.files[0]);
    this.setState(()=>({
          file: e.target.files[0]
    }))

      resolve(x);
      reject('fail')
    })

}


  sendToStorage = (e)=>{
    e.persist()

    let a = this.setPic(e)

    a.then(()=>{
      console.log(this.state.file);
    })
    .then(()=>{
      let file = this.state.file;
      console.log(file);
      let storageRef = storage.ref('images/' + this.state.file.name)
      let task = storageRef.put(file);

      task.then((snapshot)=>{
          let percentage = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
          console.log(percentage);
          this.setState(()=>({progress: percentage}))
      })

      .then(()=>{

          let storageChild = `images/${this.state.file.name}`;
          let storageRef = storage.ref()
          let tangRef = storageRef.child(storageChild);

          tangRef.getDownloadURL().then((url)=>{
            console.log(url);
            this.setState(()=>({
              profile_image:url
            }))
          })
          .then(()=>{
            console.log(this.state);
          })
      })

    })
  }



  onUserNameChange = (e) =>{
   const user_name = e.target.value;
   this.setState(()=>({ user_name}));
  }

  onUserBioChange = (e) =>{
    const user_bio = e.target.value;
    this.setState(()=>({ user_bio }));

  }

  onUserLocationChange = (e) =>{
    const user_location = e.target.value;
    this.setState(()=>({ user_location }));

  }
  onDateChange = (createdAt) =>{
   if(createdAt){
     this.setState(()=>({ createdAt }))
   }
  }

  onSubmit = (e)=>{
    e.preventDefault();
    const a = this.hasSet();

    a.then(()=>{
console.log(this.state.interests);
      if(!this.state.tags )
      {
        console.log('no profile tags');
          this.setState(()=>({error:'Please enter some interests/tags.'}))
      } else{
        this.setState(()=>({error: ''}));
        if(!this.state.error){
        // this.state.interests = {}
        }
      }

    })

    .then(()=>{

      if( !this.state.user_name || !this.state.user_bio || !this.state.user_location){
        this.setState(()=>({error: 'Please choose a unique user name and stuff'}));
      } else{
        this.setState(()=>({error: ''}));
        console.log(this.state);
        this.props.onSubmit({

          user_name: this.state.user_name,
          user_bio: this.state.user_bio,
          user_location: this.state.user_location,
          createdAt: this.state.createdAt.valueOf(),
          profile_image: this.state.profile_image,
          tags: this.state.tags,


        })

        if(!this.state.error){
          this.state.user_name = "";
          this.state.user_bio = "";
          this.state.user_location= "";
        }
      }
    })



  }


  handleInterestInputChange=(e)=>{

    e.persist();
    // console.log(e.target.value);
    this.setState(()=>({ input:e.target.value }))
  }

  handleInputKeyDown=(e)=>{

    if(e.keyCode === 13){
      const value = e.target.value.trim();
      this.setState(()=>({
      interestsArr: [...this.state.interestsArr, value],
      input: ''}))
    }


    if(this.state.interestsArr.length && e.keyCode === 8 && !this.state.input.length){
      this.setState(()=>({
        tagArr: this.state.interestsArr.slice(0, this.state.interestsArr.length -1)
      }))
    }
  }


  handleRemoveItem=(itemToRemove, key)=>{
    console.log('removing');
   this.setState((prevState)=>{
     return{
       interestsArr:this.state.interestsArr.filter((x)=>{
         return x !== itemToRemove;
       })
     }
  })
  }

  render(){


    return(
      <div className="col">
      <h1>Your Profile</h1>
        <div>
            <ul>
            {this.state.interestsArr.map((item, x)=>{
              return <li    key={x}
            >
              <span><button  >{item}</button>
              <button   onClick={(e)=>{
                this.handleRemoveItem(item, x)
              }}>x</button></span>
              </li>
            })}
            <p>
            <label>add interests:</label><input
            value={this.state.input}
            onChange={this.handleInterestInputChange}
            onKeyDown={this.handleInputKeyDown} />
            </p>
            </ul>


      </div>

       <span></span>

<div className="progress">
 <div className="progress-bar"  role="progressbar" value={this.state.progress} max="100" name="progressBar"></div>
</div>

      <input type="file"
      id="fileButton" onChange={this.sendToStorage}/>

      {this.state.error && <p >{this.state.error}</p>}
      <form   onSubmit={this.onSubmit}>
 <div className="form-group">
 <label>User Name</label>
      <input
      type="text"
      className="col-sm-4"
      placeholder="User Name"
      value={this.state.user_name}
      onChange={this.onUserNameChange}
      />
    </div>

    <div className="form-group">
    <label>Bio:</label>

    <textarea
      type="text"

      className="form-control note-entry"
      placeholder="Tell us about yourself."
      maxLength="500"
      value={this.state.user_bio}
      onChange={this.onUserBioChange}
      />
    </div>


    <div className="form-group">
    <label>Location</label>
    <input
    type="text"
      className="col-sm-4"
    placeholder="Location"
    value={this.state.user_location}
    onChange={this.onUserLocationChange}
    />
    </div>





      <button className="btn btn-primary btn-lg">  Create Profile</button>

      </form>

      </div>
    )
  }

}
