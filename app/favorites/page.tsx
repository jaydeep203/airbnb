import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import getFavoritesListing from '../actions/getFavoritesListing';
import FavoritesClient from './FavoritesClient';

const page = async() => {

  const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <EmptyState 
                title='UnAuthorized'
                subtitle='Please Login'
            />
        )
      }
    
    const favorites = await getFavoritesListing();
    if(!favorites || favorites.length===0){
      return (
          <EmptyState 
              title='No favorites found.'
              subtitle='Looks like you have no favorite listing'
          />
      )
    }

  return (
    <FavoritesClient  
      listings ={favorites}
      currentUser={currentUser}
    />
  )
}

export default page