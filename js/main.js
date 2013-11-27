/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var host = "";
$(document).ready(function() {
    host = window.location.host;

    $.ajaxSetup({
        cache: false
    });
});

function authenticate()
{

    var username = $("#txtUserName").val().trim();
    var password = $("#txtPassword").val().trim();
    if (!isEmail(username)) {
        alert("Please enter a valid email id");
        return false;
    }
    if (password == "")
    {
        alert("Please enter a password");
        return false;
    }


    $.ajax({
        url: "http://" + host + "/edunova-restful/login/login",
        type: "POST",
        action: "Authenticating",
        data: {
            username: username,
            password: password
        },
        success: function(userMap) {
            alert(userMap.roleId);
            switch (userMap.roleId)
            {

                case 0:
                    alert("Incorrect Username or Password");
                    break;
                case 1:
                    location.href = "superadmin/superadminhome.html";
                    break;
                case 2:

                    location.href = "home.html";
                    break;
                default :

            }
        },
        error: function() {
            alert("Incorrect username or password");
        }


    });
}
function fillClassDropDown()
{
    $.ajax({
        url: "http://localhost:8080/edunova-restful/schoolsettings/getstandards",
        type: "GET",
        action: "Getting standards details",
        success: function(list) {
            $("#ddlStd").empty();
            for (var i = 0; i < list.length; i++) {

                var text = list[i].stdName;
                var value = list[i].stdId;
                var option = $("<option>", {
                    value: value
                });
                $(option).html(text);
                $("#ddlStd").append(option);
            }
        },
        error: function() {
            alert("error");
        }

    });
}
function fillDivisionDropdown()
{
    $.ajax({
        url: "http://localhost:8080/edunova-restful/schoolsettings/getdivisions",
        type: "GET",
        action: "Getting division details",
        success: function(list) {
            $("#ddlDiv").empty();
            for (var i = 0; i < list.length; i++) {

//                var text = list[i].divName;
//			var value = list[i].divId;
//			var option = $("<option>", {
//				value : value
//			});
//			$(option).html(text);
//			$("#ddlDiv").append(option);
                var span = $("<span>");

                var check = $("<input>", {
                    type: "checkbox",
                    name: "ddlMultiCheck",
                    value: list[i].divId
                });

                $(span).append(check);
                $(span).append(list[i].divName);
                $("#multiDivDdl").append(span);
                $(check).click(function() {
                    if ($(this).is(":checked"))
                    {
                        $(this).parent().addClass("checked");
                    }
                    else
                    {
                        $(this).parent().removeClass("checked");
                    }
                });
                $("#multiDivDdl").animate({
                    height:30 
                 });

            }
             $("#multiDivDdl span:eq(0)").click(function(){
                 $("#multiDivDdl").animate({
                    height:150 
                 });
             });
            


        }
    });
}
function registerMenuEvents()
{

    $("#divMainMenu table span").click(function() {
        switch ($(this).html())
        {
            case "Add Class":
                loadAddClassPage();
        }
    });
}
function loadAddClassPage()
{
    $.get("settings/addclass.html", function(page) {
        $("#pageContainer").html(page);
        $("#divPrompt").hide();
        fillClassDropDown();
        fillDivisionDropdown();
        registerButtonEvents();
    });
}
function registerButtonEvents()
{
    $("#btnAddClass").click(function(){
        
        $("#divPrompt").show();
    });
    $("#btnYes").click(function (){
       alert(""); 
    });
     $("#btnNo").click(function (){
       alert(""); 
    });
}
