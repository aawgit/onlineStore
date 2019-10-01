
class AuthService {

    setAuthDetail(data) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('id', data.user.id);
        sessionStorage.setItem('name',data.user.username)
    }

}
const authService = new AuthService();
export default authService;