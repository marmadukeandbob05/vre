$(function(){var database=firebase.database();function userCreateVars(userId){firebase.database().ref('users/'+userId).set({nvr:0,nvr_correct:0,math:0,math_correct:0,vr:0,vr_correct:0,displayName:firebase.auth().currentUser.displayName});}
$("#btnSignUp").click(function(){var email=$("#txtEmail").val();var pass=$("#txtPassword").val();if(pass==pass){firebase.auth().createUserWithEmailAndPassword(email,pass)
var user=firebase.auth().currentUser;}else{$("#txtError").css("display","block");$("#txtError").text("Passwords do not match");}
var stopListening=firebase.auth().onAuthStateChanged(function(user){var user=firebase.auth().currentUser;var database=firebase.database();if(user){var displayName=user.displayName;var email=user.email;var emailVerified=user.emailVerified;var photoURL=user.photoURL;var isAnonymous=user.isAnonymous;var uid=user.uid;var providerData=user.providerData;console.log(uid);console.log(email);user.updateProfile({displayName:$("#fname").val().concat(" ").concat($("#lname").val())});dispName=$("#fname").val().concat(" ").concat($("#lname").val());console.log(dispName);firebase.database().ref("users/"+firebase.auth().currentUser.uid).child("displayName").set(dispName);userCreateVars(user.uid);user.sendEmailVerification().then(function(){console.log("Verification Email Sent Succesfully!");window.location="/verify.html";}).catch(function(error){console.log("An error occured when sending a Verification Email :-( .");});userCreateVars(user.uid);$("#btnLogOut").show();stopListening();}else{}});});$("#btnLogOut").click(function(){$("#btnLogOut").hide();firebase.auth().signOut();});$("#btnLogin").click(function(){var email=$("#txtEmail").val();var pass=$("#txtPassword").val();firebase.auth().signInWithEmailAndPassword(email,pass);firebase.auth().onAuthStateChanged(function(user){var user=firebase.auth().currentUser;var database=firebase.database();if(user){var displayName=user.displayName;var email=user.email;var emailVerified=user.emailVerified;var photoURL=user.photoURL;var isAnonymous=user.isAnonymous;var uid=user.uid;var providerData=user.providerData;console.log(uid);console.log(email);if(user.emailVerified==true){window.location="/learn/browse.html";}else{window.location="/verify.html";}}else{}});});});
