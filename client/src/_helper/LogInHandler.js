module.exports = {checkLoggedIn(){
    if(sessionStorage.getItem("user")) return true;
    else return false;
},
signOut(){
    sessionStorage.removeItem("user");
}}