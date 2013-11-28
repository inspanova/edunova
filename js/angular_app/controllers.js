
function HomeController($scope, $element, $http, $timeout, share, $location)
{
    $scope.is_authenticated = false;
    $scope.current_user = '';
    $scope.host = "localhost:8080";
    $scope.init = function(user_id)
    {
        /*$scope.current_user_id = user_id;
        $scope.upcoming_games = [];
        $scope.sports = [];
        if(user_id != 'None') {
            $scope.is_authenticated = true;
        }
        $http.get('/upcoming_games/').success(function(data)
        {
            $scope.upcoming_games = data.games;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });
        $http.get('/sports/').success(function(data)
        {
            $scope.sports = data.sports;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });*/
    };
    $scope.login = function(){
        var params = $.param({
            "username" : $scope.username,
            "password" : $scope.password,
        });
        console.log(params);
        $http({
           method : 'Post',
           url: "http://" + $scope.host + "/edunova-restful/login/login",
           data : params,
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            /*$scope.current_user = data.current_user;
            $scope.is_authenticated = true;*/
            console.log(data);
        }).error(function(data, status)
        {
        });

    };

    /*$scope.remove_fav = function(index, user_id, csrf_token)
    {
        var url = '/favs/user/del/';
        var form_data = 'id=' + user_id + '&csrfmiddlewaretoken=' + csrf_token;
        $scope.fav_loader = true;
        $http.post(url, form_data).success(function(data, status)
        {
            if (data && data.result === 'ok')
            {
                $scope.fav_users.splice(index, 1);
            } else
            {
                console.log('request failed');
                console.log(data);
            }
            $scope.fav_loader = false;

        }).error(function(data, status)
        {
            console.log(data || "Request failed");
            $scope.fav_loader = false;
        });
    };*/

    
}
/*
function fetch_events($scope, $http, type, clazz_info) {
  //get content events
    var params = {
        "page" : $scope.next_page,
        "hashtag" : "event",
        "from_date" : "today",
    };
    
    set_class_or_group(clazz_info, params);

    $http({
        url : '/content/events/5/',
        method : "GET",
        params : params,
    }).success(function(data)
    {
        $scope.upcoming_events = data.events;
        $scope.class_schedule = data.class_schedule;
    }).error(function(data, status)
    {
        $scope.side_bar_loader = false;
        $scope.show_error_box(data);
    });
}*/