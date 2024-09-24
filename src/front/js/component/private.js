import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(store.token&&store.token!==""&&store.token!==undefined?
            navigate("/private")
            :
            navigate("/login"));
    }, [store.token]) 
    return (
        <div>
            welcome to your private page 8) 
        </div>
    )
};