import { NextResponse } from "next/server";

import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
    listingId?: string;
}

export async function DELETE(
    request:Request,
    {params} : {params:Iparams}
){
   

    
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid Id.");
    }

    const listing = await prismadb.listing.deleteMany({
        where:{
            id:listingId,
            userId:currentUser.id
        },
    });

    return NextResponse.json(listing);


}