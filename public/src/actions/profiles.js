import database from '../firebase/firebase'


export const addProfile = (profile)=>({
  type: 'ADD_PROFILE',
  profile
})

export const startAddProfile = (profileData = {}) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;

  const {

    user_id = uid,
    user_name = '',
    user_bio = '',
    user_location ='',
    profile_image='',
    createdAt = 0,
    tags = {}

  } = profileData;
  const profile = {
     user_id,
     user_name,
     user_bio,
     user_location,
     profile_image,
     tags,
     createdAt
    }
console.log(profile);
  database.ref(`users/${uid}/profiles`).push(profile)
  // database.ref(`${uid}/users/profiles`)
  .then((ref) => {
    dispatch(addProfile({
      id: ref.key,
      ... profile
    }));
  })
  }

}


export const startRemoveProfile =({ id} = {})=>{
  const profile_id = id;

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/profiles/${ id }`).remove()
    .then(() => {
      dispatch(removeProfile({ id }))
    })
  }
}

export const removeBook = ({ id } = {}) =>({
  type: 'REMOVE_PROFILE',
  id
})

export const editProfile = (id, updates)=>({
  type:'EDIT_PROFILE',
  id,
  updates
})

export const startEditProfile= (id, updates) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/profiles/${id}`).update(updates)
   .then(() => {
     dispatch(editProfile(id, updates))
   })
  }

}
export const setProfiles = (profiles) => ({
  type: 'SET_PROFILES',
  profiles
})

export const startSetProfiles = () => {
  console.log('setting profiles');
 return (dispatch, getState) => {
   console.log(getState().auth);
   const uid = getState().auth.uid


      return database.ref(`users/${uid}/profiles`)
   .once('value')
   .then((snapshot) => {
     const profiles = [];

     snapshot.forEach((childSnapshot) => {
       profiles.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
       })
     })
    dispatch(setProfiles(profiles))
   })
 }
}
