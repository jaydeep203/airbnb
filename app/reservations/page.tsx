import React from 'react';

import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

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
        authorId:currentUser.id
    });

    if(reservations.length === 0){
        return (
            <EmptyState 
                title='No reservations found.'
                subtitle='Looks like no reservations found on your property.'
            />
        )
    }

  return (
    <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default Page;