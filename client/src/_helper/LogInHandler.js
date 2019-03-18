module.exports = {checkLoggedIn(){
    if(sessionStorage.getItem("jwtToken")) return true;
    else return false;
}}