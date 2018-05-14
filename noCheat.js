$(function(){var b=firebase.auth();var a=b.currentUser;firebase.auth().onAuthStateChanged(function(c){if(c){console.log("User is present!")}else{window.location.href="/noAccount.html"}})});
