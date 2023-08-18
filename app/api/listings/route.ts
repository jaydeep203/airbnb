import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request:Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price
    } = body;

    const listing = await prismadb.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            LocationValue:location.value,
            price:parseInt(price, 10),
            userId:currentUser.id
        }
    });

    return NextResponse.json(listing);

}