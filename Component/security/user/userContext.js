/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

import React, {useState} from "react"
import checkServer from "../../bdd/checkServer";

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({connected: false})


    /**
     * Fetch if current user is logged and store it.
     * Launch this every login/logout
     *
     */
    const fetchCurrentUser = async () => {

        const server = checkServer();

        const res_user = await fetch(`${server}/api/auth/user`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const doc = await res_user.json();

        setCurrentUser(doc)
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)