import User from "../models/User";

export const getUsers = async (id=null) => {
    const users = id? await User.find({id}): await User.find()
    return users
}
