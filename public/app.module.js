'use strict'
import angular from 'angular'
import 'angular-resource'
import 'angular-route'
import 'angular-ui-bootstrap'

angular.module('beerShelfApp', [
  'ngRoute',
  'service',
  'component.account',
  'component.login',
  'component.mainHeader',
  'component.modalWindow',
  'component.reviews',
  'component.settings',
  'component.shelf',
  'component.userList'
])

require('./app.config')
require('./service/service.module')
require('./component/account/account.module')
require('./component/login/login.module')
require('./component/main-header/main-header.module')
require('./component/modal-window/modal-window.module')
require('./component/reviews/reviews.module')
require('./component/settings/settings.module')
require('./component/shelf/shelf.module')
require('./component/user-list/user-list.module')
