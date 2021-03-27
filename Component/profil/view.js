/*
 * Copyright (c) 2021 Ankward. All right reserved.
 *
 * Ankward (https://ankward.fr)
 */

export default function View({user}){


    return(

        <div className="container-md mt-5">
            <h1>{user.name} {user.surname} <span className="text-muted">({user.pseudo})</span> </h1>


        </div>

    )

}