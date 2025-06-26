import React, { createContext, useContext, useState } from 'react';
import type { User } from '../pages/types';

type UserContextType = {
    user: User;
    updateUser: (userData: User) => void;
    clearUser: () => void;
};

const userContext = createContext<UserContextType | null>(null);


const UserProvider = ({children}:{children:React.ReactNode}) =>{
    const [user,setUser] = useState<User>(null);

    const updateUser = (userData : User) : void =>{
        setUser(userData);
    }
    const clearUser = () : void =>{
        setUser(null);
    }
    const transporter = {
        clearUser,
        updateUser,
        user
    }
    return <>
        <userContext.Provider value={transporter}>
            {children}
        </userContext.Provider>
    </>
}

export const useUserContext = (): UserContextType => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};


export default UserProvider;