

import {Request, Response} from 'express';
import {authenticate} from "./db-data";




export function loginUser(req: Request, res: Response) {

    console.log("User login attempt ...");

    const {email, password, isLoggedIn} = req.body;

    const user = authenticate(email, password,isLoggedIn);

    if (user) {
        res.status(200).json({id:user.id, email: user.email,isLoggedIn:user.isLoggedIn});
    }
    else {
        res.sendStatus(403);
    }

}


