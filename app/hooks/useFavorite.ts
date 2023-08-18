import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import {toast} from "react-hot-toast";

import { SafeUser } from "@/types";
import useLoginModal from "./useLoginModal";

interface IuseFavoritId{
    listingId: string;
    currentUser?:SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}:IuseFavoritId) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    },[listingId, currentUser]);

    const toggleFavorite = useCallback(async(
        ev: React.MouseEvent<HTMLDivElement>
    )=> {
        ev.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if(hasFavorited){
                request = () => axios.delete(`/api/favorites/${listingId}`)
            }
            else{
                request = () => axios.post(`/api/favorites/${listingId}`);
            }

            await request();
            router.refresh();
            toast.success("Success!");

        }catch(error){
            console.log(error);
            toast.error("Something went wrong.");
        }

    },[
        currentUser,
        hasFavorited,
        listingId,
        loginModal,
        router
    ]);

    return {
        hasFavorited,
        toggleFavorite
    }

}

export default useFavorite;