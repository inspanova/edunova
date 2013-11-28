
function isEmail(email) {
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function LoginController($scope, $element, $http, $timeout, share, $location)
{
    $scope.is_authenticated = false;
    $scope.current_user = '';
    $scope.host = window.location.host;
    $scope.init = function()
    {
        console.log('hai');
    };
    $scope.login = function(){
        
        if (!isEmail($scope.username)) {
            alert("Please enter a valid email id");
            return false;
        }
        if ($scope.password == "")
        {
            alert("Please enter a password");
            return false;
        }
        var params = $.param({
            "username" : $scope.username,
            "password" : $scope.password,
        });
        $http({
           method : 'Post',
           url: "http://" + $scope.host + "/edunova-restful/login/login",
           data : params,
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            var role = data.role;
            if(role == 0) 
                alert("Incorrect Username or Password");
            else if(role == 1)
                location.href = "superadmin/superadminhome.html";
            else
                location.href = "home.html";
                   
        }).error(function(data, status)
        {
        });
    };
}

function SuperAdminController($scope, $element, $http, $timeout, share, $location)
{
    $scope.is_authenticated = false;
    $scope.current_user = '';
    $scope.host = window.location.host;
    $scope.init = function()
    {
        console.log("super admin");
        $http.get("http://"+$scope.host+"/edunova-restful/login/getschool").success(function(data)
        {
            console.log(data);
            $scope.schools = data;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
            $scope.fav_loader = false;
        });
    };
    $scope.enableOrDiableSchool = function(school_id) {
        var params = $.param({
            value: value,
            schoolId: schoolId.trim()
        });
        $http({
           method : 'Post',
           url: "http://" + $scope.host + "/edunova-restful/login/activate",
           data : params,
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
                   
        }).error(function(data, status)
        {
        });
    }
}
