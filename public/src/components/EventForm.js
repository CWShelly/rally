import React from 'react';
import moment from 'moment';
import { storage } from '../firebase/firebase';
import { SingleDatePicker } from 'react-dates';
const now = moment();

export default class EventForm extends React.Component{

  constructor(props){
    super(props);
    this.state={
      event_name: props._event ? props._event.event_name : '',
      street_address:props._event ? props._event.street_address : '',
      city:  props._event ? props._event.city : '',
      _state: props._event ? props._event._state : '',
      zip: props._event ? props._event.zip : '',
      time: props._event ? props._event.time : '',
      createdAt:props._event ? moment(props._event.createdAt):  moment(),
      error: '',
      event_image: props._event ? props._event.event_image : '',
      input: '',
      interestsArr: props._event ? Object.keys(props._event.tags) : [],
      interests: props._event ? props._event.interests : {},
      tags: props._event ? props._event.tags : {},
      people_interested: props._event ? props._event.people_interested : {},
      people_going: props._event ? props._event.people_going: {},
      progress: 0,
      file: '',
      creator_id: 'tbd',
      initial_going_and_interested: '',
      calendarFocused: false,
      times:[
        '1:00pm', '1:30pm','2:00pm','2:30pm','3:00pm','3:30pm','4:00pm','4:30pm',
        '5:00pm', '5:30pm','6:00pm','6:30pm','7:00pm','7:30pm','8:00pm','8:30pm',
        '9:00pm','9:30pm','10:00pm','10:30pm','11:00pm',"11:30pm","12:00pm","12:30pm",

        '1:00am', '1:30am','2:00am','2:30am','3:00am','3:30am','4:00am','4:30am',
        '5:00am', '5:30am','6:00am','6:30am','7:00am','7:30am','8:00am','8:30am',
        '9:00am','9:30am','10:00am','10:30am','11:00am',"11:30am","12:00am","12:30am"
      ],
      showMenu: false,
      pm: false,
      ampm: 'am'

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



  onEventNameChange = (e) =>{
   const event_name = e.target.value;
   this.setState(()=>({ event_name}));
  }

  onStreetAddressChange = (e) =>{
    const street_address = e.target.value;
    this.setState(()=>({ street_address }));

  }

  onCityChange = (e) =>{
    const city = e.target.value;
    this.setState(()=>({ city }));

  }

  onStateChange = (e) =>{
    const _state = e.target.value;
    this.setState(()=>({ _state }));

  }

    onZipChange = (e) =>{
      const zip = e.target.value;
      this.setState(()=>({ zip }));

    }





  onTimeChange = (time) =>{
    event.preventDefault()
   console.log(time);
    this.setState((prevState)=>({ time,
      showMenu:!prevState.showMenu
     }));
  }

  onPMChange=(event)=>{
  event.preventDefault()

if(this.state.pm){
  this.setState((prevState)=>({
    ampm:'am',
    pm: !prevState.pm,
    time: prevState.time.slice(0,-2)
  }))

}
else{
  this.setState((prevState)=>({
    ampm:'pm',
    pm: !prevState.pm,
    time: prevState.time.slice(0,-2) + 'pm'
  }))

}


 console.log(this.state);
 }



  onFocusChange = ( { focused } ) => {
    this.setState(
      ()=>({ calendarFocused: focused }))
  }

  onDateChange = (createdAt) =>{
    console.log(createdAt);
   if(createdAt){
     this.setState(()=>({ createdAt }))
   }
   else{
     console.log('no date');
   }
  }

  onSubmit = (e)=>{
    e.preventDefault();
    console.log('submitting form');
    const a = this.hasSet();

    a.then(()=>{
const goingInterested ={}
goingInterested[localStorage.getItem('user_id')] =true

      if(!this.state.tags )
      {
        console.log('no tags');
          this.setState(()=>({error:'Please enter some tags.'}))
      } else{
        this.setState(()=>({error: '',
        people_going:Object.assign({}, goingInterested),
        people_interested:Object.assign({}, goingInterested)

      }));
        if(!this.state.error){
          console.log('no error');
          console.log(this.state);


        }
      }

    })

    .then(()=>{

      if( !this.state.event_name || !this.state.street_address ||
        !this.state.city || !this.state._state || !this.state.zip
        || !this.state.createdAt || !this.state.time
      ){

        this.setState(()=>({error: 'All fields required'}));
      } else{
        this.setState(()=>({error: ''}));

        this.props.onSubmit({

          event_name: this.state.event_name,
          street_address: this.state.street_address,
          city: this.state.city,
          _state: this.state._state,
          zip: this.state.zip,
          time: this.state.time,
          createdAt: this.state.createdAt.valueOf(),
          event_image: this.state.event_image,
          tags: this.state.tags,
          people_interested: this.state.people_interested,
          people_going:this.state.people_going

        })

        if(!this.state.error){
          this.state.event_name = "";
          this.state.street_address = "";
          this.state.city= "";
          this.state._state = "";
          this.state.zip = "";

          this.state.time = "";

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
showMenu=(e)=>{
  e.preventDefault()

this.setState((prevState)=>({
  showMenu:!prevState.showMenu
}))
}


  render(){
console.log(this.state.time !== 'am');

    return(
      <div className="col-sm-6">




      <div>
            <ul  >
            {this.state.interestsArr.map((item, x)=>{
              return <li    key={x}
            >
              <span><button className="btn btn-primary btn-xs" >{item}</button>
              <button   className="btn btn-primary btn-xs"  onClick={(e)=>{
                this.handleRemoveItem(item, x)
              }}>x</button></span>
              </li>
            })}
            <p>
            <label>add tags:</label><input
            value={this.state.input}
            onChange={this.handleInterestInputChange}
            onKeyDown={this.handleInputKeyDown} />
            </p>
            </ul>


      </div>




 <progress value={this.state.progress} max="100" name="progressBar"></progress>
      <input type="file"
      id="fileButton" onChange={this.sendToStorage}/>

      {this.state.error && <p >{this.state.error}</p>}

      <form onSubmit={this.onSubmit}>
      <button className="btn btn-primary btn-md mb-2" onClick={this.showMenu}>Times</button>
     {this.state.time}
           {this.state.showMenu &&
             <div>
           { this.state.times.map((time, index)=>{
             return <button onClick={(e)=>{this.onTimeChange(time)}} key={index}>{time}</button>
           })}
           </div>}



              <div className="form-group">
              <label>Event Name:</label>
                <input
                type="text"
                className="form-control"
                placeholder="Event Name"
                value={this.state.event_name}
                onChange={this.onEventNameChange}
                />
                </div>

                <div className="form-group">
                <label>Street Address</label>
                <input
                type="text"
                autoComplete='address-line1'
                className="form-control"
                placeholder="Street Address"
                value={this.state.street_address}
                onChange={this.onStreetAddressChange}
                />
               </div>

               <div className="form-group">
               <label>City</label>
                <input
                type="text"
                placeholder="City"

                className="form-control"
                value={this.state.city}
                onChange={this.onCityChange}
                />
                </div>

               <div className="form-group">
               <label>State</label>
                <input
                type="text"
                placeholder="State"
                className="form-control"
                value={this.state._state}
                onChange={this.onStateChange}
                />
                </div>

               <div className="form-group">
               <label>Zip Code</label>
                <input
                type="text"
                placeholder="Zip Code"
                autoComplete='postal-code'
                className="form-control"
                value={this.state.zip}
                onChange={this.onZipChange}
                />
                </div>




                  <SingleDatePicker
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={ (day) => false}

               />

                <button className="btn btn-primary btn-lg"> Add Event</button>

              </form>



      </div>
    )
  }

}
