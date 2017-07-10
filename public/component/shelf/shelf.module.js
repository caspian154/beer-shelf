'use strict'
import angular from 'angular'
// import FileUploader from 'FileUploader'

angular.module('component.shelf', ['service.shelfBeer', 'ui.bootstrap', 'service.beer', 'service.dataType', 'ngFileUpload'])

require('./shelf.component')
require('ng-file-upload')
