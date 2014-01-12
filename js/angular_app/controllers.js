
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
    $scope.new_school = {
        attributes: {
            schoolName: '',
            address1: '',
            address2: '',
            pincode: '',
            country: '',
            state: '',
            district: '',
            registration: '',
            website: '',
            establishedDate: '',
            license: '',
            phone1: '',
            phone2: '',
            fax: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            expiryDate: '',
        },
        
        reset: function(){
            this.attributes.schoolName = '';
            this.attributes.address1 = '';
            this.attributes.address2 = '';
            this.attributes.country = '';
            this.attributes.district = '';
            this.attributes.email = '';
            this.attributes.establishedDate = '';
            this.attributes.expiryDate = '';
            this.attributes.fax = '';
            this.attributes.firstName = '';
            this.attributes.lastName = '';
            this.attributes.license = '';
            this.attributes.password = '';
            this.attributes.phone1 = '';
            this.attributes.phone2 = '';
            this.attributes.pincode = '';
            this.attributes.registration = '';
        },
        set_value: function(school){
            this.attributes.schoolName = school.schoolName;
            this.attributes.address1 = school.address1;
            this.attributes.address2 = school.address2;
            this.attributes.country = school.country;
            this.attributes.district = school.district;
            this.attributes.email = school.email;
            this.attributes.establishedDate = school.establishedDate;
            this.attributes.expiryDate = school.expiryDate;
            this.attributes.fax = school.fax;
            this.attributes.firstName = school.firstName;
            this.attributes.lastName = school.lastName;
            this.attributes.license = school.license;
            this.attributes.password = school.password;
            this.attributes.phone1 = school.phone1;
            this.attributes.phone2 = school.phone2;
            this.attributes.pincode = school.pincode;
            this.attributes.registration = school.registration;
        }
    };
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
    $scope.enableOrDisableSchool = function(enabled, school) {
        var params = $.param({
            value: value,
            schoolId: scholl.schoolId.trim()
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
            school.enabled = data.enabled;       
        }).error(function(data, status)
        {
        });
    }
    $scope.createSchool = function()
    {
       if($scope.validateSchoolData($scope.new_school.attributes)){
            var params = JSON.stringify($scope.new_school.attributes);
            $http({
               method : 'Post',
               url: "http://" + host + "/edunova-restful/login/saveschool",
               data : params,
               headers : {
                   'Content-Type' : "application/json; charset=utf-8"
               }
            }).success(function(data, status)
            {
                $scope.schools.unshift(data.school);   
                $scope.new_school.reset();
            }).error(function(data, status)
            {
            });
       }
       
    }
    $scope.validateSchoolData = function validateSchoolData(schoolData)
    {
        if (schoolData.schoolName == "") {
            alert("Please enter the school name");
            return false;
        }
        if (schoolData.firstName == "")
        {
            alert("Please enter the first name");
            return false;
        }
        if (!isEmail(schoolData.email)) {
            alert("Please enter a valid email id");
            return false;
        }

        if (schoolData.password == "")
        {
            alert("Please enter a password");
            return false;
        }
        return true;
    }
}
