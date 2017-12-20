/* global firebase */
/* global Firebase */
$(function() {
  $('.modal').modal();
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA_O9wyyn23uCxJs2MT8UgG3S3yEs4JSmU",
  authDomain: "patient-login.firebaseapp.com",
  databaseURL: "https://patient-login.firebaseio.com",
  projectId: "patient-login",
  storageBucket: "",
  messagingSenderId: "8215542957"
};
firebase.initializeApp(config);

// var database = firebase.database();


var d = new Date();
d.setFullYear(d.getFullYear() - 100);
$('.datepicker').pickadate({

  today: 'Today',
  clear: 'Clear',
  close: 'Ok',
  closeOnSelect: false,
  selectMonths: true,
  selectYears: true,
  min: d,
  max: new Date()
});

$("#docSubmit").click(function docSignUp() {
      var firstName = $("#first_name").val().trim();
      // console.log(fullName);

      var lastName = $("#last_name").val().trim();
      // console.log(phoneNumber);

      var email = $("#email").val().trim();
      // console.log(email);

      var password = $("#password").val().trim();
      // console.log(password);

      if (email.length < 2) {
        alert('Please enter an email address.');
        return false;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return false;
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          }
          else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
          // })
          // .then(newUsers => {
          //   var allUsers = {
          //     fullName,
          //     phoneNumber,
          //     email,
          //     password,
          //     // UID: uid,
          //     timeAdded: firebase.database.ServerValue.TIMESTAMP
          //   };

          //   firebase.database().ref('users/' + newUsers.uid).set(allUsers);

          //   console.log("Welcome User: " + allUsers.fullName);
          // });


          // [END createwithemail]
        });
