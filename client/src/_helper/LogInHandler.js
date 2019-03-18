module.exports = {checkLoggedIn(){
    if(sessionStorage.getItem("user")) return true;
    else return false;
}}