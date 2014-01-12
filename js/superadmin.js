/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var host = "";
$(document).ready(function() {
    host = window.location.host;
    $("#divInsertSchool").hide();
//    $("#txtEstablishedDate").datepicker({
//		changeMonth : true,
//		changeYear : true,
//		yearRange : '1900:2013'
//	});
//        $("#txtPasswordExpiry").datepicker({
//            changeMonth:true,
//            changeYear:true
//        });
    $("#btnAddSchool").click(function() {


        $("#divInsertSchool").slideDown();
        $("#divTblList").slideUp();
        $("#btnSave").val("Save");


    });

    $("#btnSave").click(function() {

        var value = $(this).val().trim();
        switch (value)
        {
            case "Save":
                //createSchool();
                break;
            case "Update":
                updateSchool($("#btnSave").data("schoolId"));
//            alert($("#btnSave").data("schoolId"));


        }
    });
    $('.edit_icon').click(function() {
        var tr = $(this).parent().parent();
        var schoolAdminInfo = $(tr).data("schoolAdminInfo");

        populateEditAdminDetails(schoolAdminInfo);
        $("#divInsertSchool").slideDown();
        $("#divTblList").slideUp();
        $("#btnSave").val("Update");
        $("#btnSave").data("schoolId", schoolAdminInfo.schoolId);


    });
    $('.school_enable').change(function() {
        var tr = $(this).parent().parent();
        var schoolAdminInfo = $(tr).data("schoolAdminInfo");
        enableOrDiableSchool($(this).val(),schoolAdminInfo.schoolId);

    });
});
function createSchool()
{

    var schoolData = {};
    schoolData["schoolName"] = $("#txtSchoolName").val();

    schoolData["address1"] = $("#txtAddress1").val();
    schoolData["address2"] = $("#txtAddress2").val();
    schoolData["pincode"] = $("#txtPincode").val();
    schoolData["country"] = $("#ddlCountry").val();
    schoolData["state"] = $("#ddlState").val();
    schoolData["district"] = $("#ddlDistrict").val();
    schoolData["registration"] = $("#txtRegistration").val();
    schoolData["website"] = $("#txtWebsite").val();
    schoolData["establishedDate"] = $("#txtEstablishedDate").val();
    schoolData["license"] = $("#txtLicense").val();
    schoolData["phone1"] = $("#txtPhone1").val();
    schoolData["phone2"] = $("#txtPhone2").val();
    schoolData["fax"] = $("#txtFax").val();
    schoolData["firstName"] = $("#txtFirstName").val();
    schoolData["lastName"] = $("#txtLastName").val();
    schoolData["email"] = $("#txtAdminEmail").val();
    schoolData["password"] = $("#txtAdminPassword").val();
    schoolData["expiryDate"] = $("#txtPasswordExpiry").val();

    if (!validateSchoolData(schoolData)) {
        return;
    }
    $.ajax({
        url: "http://" + host + "/edunova-restful/login/saveschool",
        type: "POST",
        action: "Saving School Data",
        data: JSON.stringify(schoolData),
        contentType: "application/json; charset=utf-8",
        success: function(obj) {
            alert(obj.key);
            clearTextboxes();
        }
    });
}
function validateSchoolData(schoolData)
{
    if (schoolData["SchoolName"] == "") {
        alert("Please enter the school name");
        return false;
    }
    if (schoolData["firstName"] == "")
    {
        alert("Please enter the first name");
        return false;
    }
    if (!isEmail(schoolData["email"])) {
        alert("Please enter a valid email id");
        return false;
    }

    if (schoolData["password"] == "")
    {
        alert("Please enter a password");
        return false;
    }
    return true;
}
function  getSchoolDetails()
{

//    $.ajax({
//        url: "http://localhost:8080/edunova-restful/login/getschool",
//        type: "GET",
//        action: "Getting school details",
//        success: function(list) {
//            var tbody = $("#tblSchoolList").find("tbody")[0];
//            $(tbody).empty();
//            for (var i = 0; i < list.length; i++) {
//                var tr = $("<tr>");
//                $(tr).data("schoolAdminInfo", list[i]);
//                $("<td>" + list[i].schoolName + "</td>").appendTo(tr);
//                $("<td>" + list[i].addressLine1 + "</td>").appendTo(tr);
//                $("<td>" + list[i].addressLine2 + "</td>").appendTo(tr);
//                $("<td>" + list[i].phone1 + "</td>").appendTo(tr);
//                $("<td>" + list[i].phone2 + "</td>").appendTo(tr);
//
//
//
//                var imgEdit = $("<img>", {
//                    src: "../img/edit.png"
//                });
//                $(imgEdit).css("cursor","pointer");
//
//                $("<td>").append(imgEdit).appendTo(tr);
//                $(imgEdit).click(function() {
//                    var tr = $(this).parent().parent();
//                    var schoolAdminInfo = $(tr).data("schoolAdminInfo");
//
//                    populateEditAdminDetails(schoolAdminInfo);
//                    $("#divInsertSchool").slideDown();
//                    $("#divTblList").slideUp();
//                    $("#btnSave").val("Update");
//                    $("#btnSave").data("schoolId", schoolAdminInfo.schoolId);
//
//
//                });
//                var dropDown = $("<select>");
//                var option1 = $("<option>", {
//                    value: "1"
//                }).html("Enabled");
//                var option2 = $("<option>", {
//                    value: "0"
//                }).html("Disabled");
//                $(dropDown).append(option1);
//                $(dropDown).append(option2);
//                $(dropDown).css("width", "auto");
//                $("<td>").append(dropDown).appendTo(tr);
//                $(tbody).append(tr);
//                $(dropDown).val(list[i].enabled);
//                $(dropDown).change(function() {
//                    var tr = $(this).parent().parent();
//                     var schoolAdminInfo = $(tr).data("schoolAdminInfo");
//                    enableOrDiableSchool($(this).val(),schoolAdminInfo.schoolId);
//
//                });
//            }
//
//
//        }
//    });
}

function enableOrDiableSchool(value,schoolId)
{
    $.ajax({
        url: "http://" + host + "/edunova-restful/login/activate",
        type: "PUT",
        action: "Acivate or Deactivate school",
        data: {
            value: value,
            schoolId: schoolId.trim()
        },
        success: function() {
            getSchoolDetails();

        }
    });
}
function cancelSchool()
{
    clearTextboxes();
    $("#divInsertSchool").slideUp();
    $("#divTblList").slideDown();

}
function clearTextboxes()
{
    $("#txtSchoolName").val("");
    $("#txtAddress1").val("");
    $("#txtAddress2").val("");
    $("#txtPincode").val("");
    $("#ddlCountry").val("");
    $("#ddlState").val("");
    $("#ddlDistrict").val("");
    $("#txtRegistration").val("");
    $("#txtWebsite").val("");
    $("#txtEstablishedDate").val("");
    $("#txtLicense").val("");
    $("#txtPhone1").val("");
    $("#txtPhone2").val("");
    $("#txtFax").val("");
    $("#txtFirstName").val("");
    $("#txtLastName").val("");
    $("#txtAdminEmail").val("");
    $("#txtAdminPassword").val("");
    $("#txtPasswordExpiry").val("");

}
function populateEditAdminDetails(schoolAdminInfo)
{

    $("#txtSchoolName").val(schoolAdminInfo.schoolName);
    $("#txtAddress1").val(schoolAdminInfo.addressLine1);
    $("#txtAddress2").val(schoolAdminInfo.addressLine2);
    $("#txtPincode").val(schoolAdminInfo.pincode);
    $("#ddlCountry").val(schoolAdminInfo.countryCode);
    $("#ddlState").val(schoolAdminInfo.stateCode);
    $("#ddlDistrict").val(schoolAdminInfo.districtCode);
    $("#txtRegistration").val(schoolAdminInfo.registration);
    $("#txtWebsite").val(schoolAdminInfo.website);
    $("#txtEstablishedDate").val(schoolAdminInfo.establishedDate);
    $("#txtLicense").val(schoolAdminInfo.loginLicense);
    $("#txtPhone1").val(schoolAdminInfo.phone1);
    $("#txtPhone2").val(schoolAdminInfo.phone2);
    $("#txtFax").val(schoolAdminInfo.fax);
    $("#txtFirstName").val(schoolAdminInfo.firstName);
    $("#txtLastName").val(schoolAdminInfo.lastName);
    $("#txtAdminEmail").val(schoolAdminInfo.userName);
    $("#txtAdminPassword").val(schoolAdminInfo.password);
    $("#txtPasswordExpiry").val(schoolAdminInfo.expiryDate);

}
function updateSchool(schoolId)
{
    var schoolData = {};
    schoolData["schoolId"] = schoolId;
    schoolData["schoolName"] = $("#txtSchoolName").val();

    schoolData["address1"] = $("#txtAddress1").val();
    schoolData["address2"] = $("#txtAddress2").val();
    schoolData["pincode"] = $("#txtPincode").val();
    schoolData["country"] = $("#ddlCountry").val();
    schoolData["state"] = $("#ddlState").val();
    schoolData["district"] = $("#ddlDistrict").val();
    schoolData["registration"] = $("#txtRegistration").val();
    schoolData["website"] = $("#txtWebsite").val();
    schoolData["establishedDate"] = $("#txtEstablishedDate").val();
    schoolData["license"] = $("#txtLicense").val();
    schoolData["phone1"] = $("#txtPhone1").val();
    schoolData["phone2"] = $("#txtPhone2").val();
    schoolData["fax"] = $("#txtFax").val();
    schoolData["firstName"] = $("#txtFirstName").val();
    schoolData["lastName"] = $("#txtLastName").val();
    schoolData["email"] = $("#txtAdminEmail").val();
    schoolData["password"] = $("#txtAdminPassword").val();
    schoolData["expiryDate"] = $("#txtPasswordExpiry").val();
    $.ajax({
        url: "http://" + host + "/edunova-restful/login/editschool",
        type: "POST",
        action: "Updating School Data",
        data: JSON.stringify(schoolData),
        contentType: "application/json; charset=utf-8",
        success: function(obj) {

            getSchoolDetails();
            $("#divInsertSchool").slideUp();
            $("#divTblList").slideDown();
            clearTextboxes();
        }
    });
}
