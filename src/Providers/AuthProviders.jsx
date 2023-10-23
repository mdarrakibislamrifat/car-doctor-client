import {  createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext=createContext(null)
const auth=getAuth(app)
const AuthProviders = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true);

    const createUser=(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password);
    }
    
    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setLoading(false);
            setUser(currentUser);
            console.log(currentUser);
        })
        return ()=>{
           return unsubscribe();
        }
    },[])

    const authInfo={
        user,loading,createUser,signIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;