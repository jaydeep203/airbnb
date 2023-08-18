import React from 'react';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';


const Page = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState 
                title='UnAuthorized'
                subtitle='Please Login'
            />
        )
    }

    const reservations = await getReservations({
        userId : currentUser.id
    });

    if(reservations.length === 0){
        return (
            <EmptyState 
                title='No trips found.'
                subtitle='Looks like you havent reserved trips.'
            />
        )
    }

  return (
    <TripsClient
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default Page