'use strict';
// Register `phoneList` component, along with its associated controller and template
angular.
  module('account').
  component('account', {
    templateUrl: 'account/account.template.html',
    controller: ['User', 'Auth','$window',
      function AccountController(User, Auth, $window) {
        var self = this;

        /** Functions **/
        // Update the user
        this.updateUser = function() {
          if (self.currentUser.newPassword1 || self.currentUser.newPassword2) {
            if (self.currentUser.newPassword1 === self.currentUser.newPassword2) {
              self.currentUser.password = self.currentUser.newPassword1
            }
            else {
              self.error = "New Password and Confirm New Password do not match"
              return
            }
          } else if (self.currentUser.reset_password_flag) {
            self.error = "This account has been flagged for a new password - please specify a new password"
            return
          }

          User.update(self.currentUser, function(userObject) {
            self.currentUser = userObject
            self.success = true
          })
        }

        /** End of functions **/

        this.currentUser = Auth.getCurrentUser();
        if (!this.currentUser) {
          $window.location.href = '#!/logout';
        }
      }
    ]
  });
