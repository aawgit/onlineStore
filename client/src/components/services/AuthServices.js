
class AuthService {

    setAuthDetail(data) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('id', data.user.id);
        sessionStorage.setItem('name',data.user.username)
    }
    getAuthToken() {
        const token = sessionStorage.getItem('token');
        return token;
    }
    getLoggedUser(){
        const id = sessionStorage.getItem('id');
        const name = sessionStorage.getItem('name');
        return {Id:id,Name:name};
    }
}
const authService = new AuthService();
export default authService;