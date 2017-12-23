/* global firebase */
/* global Firebase */
$(function() {
  $('.modal').modal();

  // Initialize Firebase
  var patConfig = {
    apiKey: "AIzaSyA_O9wyyn23uCxJs2MT8UgG3S3yEs4JSmU",
    authDomain: "patient-login.firebaseapp.com",
    databaseURL: "https://patient-login.firebaseio.com",
    projectId: "patient-login",
    storageBucket: "patient-login.appspot.com",
    messagingSenderId: "8215542957"
  };
  var patConfig = firebase.initializeApp(patConfig, "patient");

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


  // Patient Register Setup
  $("#patRegistration").click(function patSignUp() {

    var email = $("#newPatEmail").val().trim();
    // console.log(email);

    var password = $("#newPatPassword").val().trim();
    // console.log(password);

    if (email.length < 2) {
      alert('Please enter an email address.');
      return false;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return false;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    patConfig.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    }).then(function() {
      initAuth();

    });
  });

  var patId;
  var userEmail;

  function initAuth() {
    // Listening for auth state changes.
    // [START authstatelistener]
    patConfig.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
        patId = user.uid;
        userEmail = user.email;
        console.log("Current Logged in User ID: " + patId);
        $("#patFormId").attr("value", patId);
        $("#patFormEmail").attr("value", userEmail);


      }
      else {
        // User is signed out.
        console.log("No User present.");
      }
    });
  }
  var gender;
  $(":radio[name=gender]").change(function() {
    gender = this.value;
    console.log(gender);
  });



  $("#patFormSubmit").click(function patTablePush() {

    var newPatFullName = $("#newPatFullName").val().trim();

    var email = $("#patFormEmail").val().trim();

    var bday = $("#bday").val().trim();

    var visit_reason = $("#newPatReason").val().trim();

    var patFormId = $("#patFormId").val().trim();

    function getPatId() {
      $.ajax({
        method: "POST",
        url: "/patient",
        data: {
          full_name: newPatFullName,
          pat_email: email,
          bday: bday,
          gender: gender,
          visit_reason: visit_reason,
          pat_uid: patId
        }
      }).done(function(data) {
        console.log("Patient UID = " + patId);

      });
    }
    getPatId();
  });
  //Patient Login Setup
  $("#patLogin").click(function patLogin() {

    var patEmailLogin = $("#patEmail").val().trim();

    var patPasswordLogin = $("#patPassword").val().trim();

    if (patEmailLogin.length < 2) {
      alert('Please enter an email address.');
      return false;
    }
    if (patPasswordLogin.length < 4) {
      alert('Please enter a password.');
      return false;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    patConfig.auth().signInWithEmailAndPassword(patEmailLogin, patPasswordLogin).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        $("#docLoginModal").leanModal();
      }
      else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  });






});
