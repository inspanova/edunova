'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var edunova_serv = angular.module('edunova.services', ['ngResource']);

edunova_serv.value('version', '0.1');

edunova_serv.factory('share', function()
{
    return {
        messages : {
            show : false,
            type : '',
            message : ''
        },
        loader : {
            show : false
        }
    };
});