import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import User from "../models/User";
import randomString from "randomstring";
import mailer from "../_helper/mailer";


export const loginUserWithFB =  async (req, res) => {
    try{
        const user = await User.findOne({ email: req.user.email })
        if(!user){
          user = await User.create(req.user)
        }
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });
        return res.send({
            auth: true,
            token: token,
            userId: user._id,
            name: user.name,
        });
    }catch(err){
        return res
        .status(500)
        .json({ message: `Problem in creating new user. Error: ${err}` });
    }
}

export const registerUser = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(409)
          .json({ message: "This e-mail is already registered" });
      }
      let hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const secretToken = randomString.generate();
      let newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        //For email verification
        secretToken: secretToken,
        isActivated: false,
      });
      if (newUser) {
        console.log(newUser);
        const mailOptions = {
          from: "support@mirrorwall.org", //sender address
          to: newUser.email, //list of receivers
          subject: "Please verify the email address", // Subject line
          html: `<h4>Thank you for registering.<h4>
          <p>Please verify this email address by clicking the following link</p>
          <a href="https://frozen-lake-54898.herokuapp.com/api/auth/verify/${newUser.secretToken}">
          https://frozen-lake-54898.herokuapp.com/api/auth/verify/${newUser.secretToken}</a>`,
        };
        let mailResponse = await mailer.sendMail(mailOptions);
        if (mailResponse.messageId) {
          res.status(200).send(newUser.email);
        } else {
          let deleted = await User.deleteOne({ email: req.body.email });
          console.log(deleted);
          throw new Error("Something wrong");
        }
      }
    } catch (err) {
      console.log(err);
      let deleted = await User.deleteOne({ email: req.body.email });
      return res.status(500).json({ message: "Error. User Not registered" });
    }
  }


  export const loginUser = async (req, res)=>{
    try{
        const user = await User.findOne({ email: req.body.email })
        //console.log(config.clientID, config.clientSecret)
        if (!user) return res.status(404).send("No user found.");
        if (!user.isActivated) {
          //console.log("activation", user, user.isActivated);
          return res.status(401).send("Please verify the email address first");
        }
    
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          //console.log("password", req.body.password, passwordIsValid);
          return res.status(401).send({ auth: false, token: null });
        }
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        res
          .status(200)
          .send({ auth: true, token: token, userId: user._id, name: user.name });
          
    }catch(err){
        return res.status(500).send("Error on the server.");
    }
        
  }

  export const verifyWithSecretToken = async (req, res)=>{
    try{
        const user = await User.findOne({ secretToken: req.params.secretToken })
        
        if (!user) return res.status(404).send("No user found.");
    
        user.isActivated = true;
        user.secretToken = "";
    
        user.save(function (err, user) {
        if (err) return res.status(500).send("Error verifying the account");
        res.redirect("https://frozen-lake-54898.herokuapp.com/#/login/");
        });
    }catch(err){
        return res.status(500).send("Error on the server.");
    }
  }


export const getMe = (req, res) =>{
    try{
        const user = User.findById(req.userId, { password: 0 })
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    }catch(err){
            return res.status(500).send("There was a problem finding the user.");
    }     
}