import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";



export const AuthContext = createContext();

export const AuthContextProvider = ({ Children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    }, [])

    const login = async (email, password) => {
        try {

        } catch (e) {

        }
    }

    const logout = async () => {
        try {

        } catch (e) {

        }
    }

    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            // setUser(response?.user);
            // setIsAuthenticated(true);

            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid

            });
            return { succes: true, data: response?.user };
        } catch (e) {
            return { succes: false, msg: e.message };
        }

        return (
            <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
                {Children}
            </AuthContext.Provider>
        )
    }
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('UseAuth must be wrappped inside AuthContexProvider');
    }
    return value;
}