import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    //  const axiosPublic = useAxiosPublic();


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false);
            // console.log(currentUser)
            // if(currentUser){
            //   const usersInfo = {email: currentUser.email};
            //   axiosPublic.post('/jwt', usersInfo)
            //   .then(res =>{
            //     console.log(res.data.token)
            //     if(res.data.token){
            //       localStorage.setItem('access-token', res.data.token);
            //       setLoading(false);
            //     }
            //   })
            // }
            // else{
            //   localStorage.removeItem('access-token');
            //   setLoading(false);
            // }

        });
        return () => {
            return unsubscribe();
        }
    }, [])


    const userInfo = { user, loading, createUser, signIn, logOut, updateUserProfile, googleSignIn }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;