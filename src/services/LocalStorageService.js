const LocalStorageService = (function () {
    var _service; function _getService() {
        if (!_service) {
            _service = this;
            return _service
        } return _service
    } 
    
    
    function _setToken(tokenObj) {
        localStorage.setItem('access_token', tokenObj.token);
        localStorage.setItem('usr', JSON.stringify({company: tokenObj.company}));
    } 
    
    function _getAccessToken() {
        return localStorage.getItem('access_token');
    } 
    
    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('usr');
    }

    function _getCompany() {
        return JSON.parse(localStorage.getItem('usr')).company;
    }

    function _isAdmin() {
        let values = _getCompany();

        if (typeof values != "undefined"){
            return (values.is_superuser);// if id equals 1, its the admin
        }

        return false;
    }
    
    
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        clearToken: _clearToken,
        isAdmin: _isAdmin
    }
})(); 

export default LocalStorageService;