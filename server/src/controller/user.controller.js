import express from 'express';
import bodyParser from "body-parser";

import {getUsers} from "../service/user.service";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get("/", async (req, res) => {
    try{
        const users = await getUsers()
        res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send("There was a problem finding the users.");
    }
});

router.get("/:id", async (req, res) => {
    try{
        const users = await getUsers(req.params.id)
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(users);
    }
    catch(err){
        return res.status(500).send("There was a problem finding the user.");
    }
})

export default router;
