// module.exports = {checkLoggedIn(){
//     if(sessionStorage.getItem("user")){
//         return(JSON.parse(sessionStorage.getItem("user")))
//       }
//       else return false;
// },
// signOut(){
//     sessionStorage.removeItem("user");
//     console.log("signed out");
// }}

export function checkLoggedIn(){
    if (sessionStorage.getItem("user")) {
        return (JSON.parse(sessionStorage.getItem("user")))
    }
    else return false;
};

export function signOut(){
    sessionStorage.removeItem("user");
    console.log("signed out");
};
