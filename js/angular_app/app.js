'use strict';

var app = angular.module('edunova', ['edunova.services']);

app.config(function($interpolateProvider)
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})

