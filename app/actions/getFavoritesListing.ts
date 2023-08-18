import prismadb from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoritesListing(){
    try{

        const currentUser = await getCurrentUser();
        if(!currentUser){
            return [];
        }

        const favorites = await prismadb.listing.findMany({
            where:{
                id:{
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toString(),
          }));
          
        return safeFavorites;
    }catch(error: any){
        throw new Error(error);
    }
}