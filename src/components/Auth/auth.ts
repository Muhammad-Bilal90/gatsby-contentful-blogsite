import React from 'react';
import app from 'gatsby-plugin-firebase-v9.0';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signOut, Auth, User} from 'firebase/auth';



export const UserLogin = async (email: string, password: string) => {
        const auth = getAuth(app);
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
}

export const UserSignup = async (email: string, password: string) => {
        const auth = getAuth(app);
        const user = await createUserWithEmailAndPassword(auth, email, password);
        return user;
}

// export const updateUserProfile = async (displayName: string) => {
//         const auth: Auth = getAuth(app);
//         const updateUser = await updateProfile(auth.currentUser, {
//             displayName: displayName,
//         }).then(() => {
//             console.log("User Updated Successfully!");
//         }).catch((err) => {
//             console.log(err);
//         })

//         return updateUser;
// }        

export const signoutUser = async () => {
    const auth = getAuth(app);
    const response = signOut(auth);
    return response;
}
