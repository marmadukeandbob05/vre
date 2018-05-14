$(function() {
  startingQuestion = "VRE1";
  test = false;

  function makeDisabled() {
    $('#a').prop('disabled', false);
    $('#b').prop('disabled', false);
    $('#c').prop('disabled', false);
    $('#d').prop('disabled', false);
    $('#e').prop('disabled', false);
  }
  makeDisabled();
  $("#btnText").text("Next Question");
  if (test == true) {
    $(".hideWhenDone").hide();
    $("#done").show();
    answers = {
      1: "Correct",
      2: "Incorrect",
      3: "Correct",
      4: "Correct",
      5: "Incorrect",
      6: "Incorrect",
      7: "Correct",
      8: "Incorrect",
      9: "Incorrect",
      10: "Correct"
    };
    flags = {
      1: false,
      2: true,
      3: true,
      4: true,
      5: false,
      6: false,
      7: false,
      8: true,
      9: false,
      10: true
    };
    indAnswers = {
      1: "B",
      2: "B",
      3: "D",
      4: "B",
      5: "D",
      6: "E",
      7: "E",
      8: "B",
      9: "C",
      10: "E"
    };
    displayEnding();
  } else {
    $(".hideWhenDone").show();
    $("#done").hide();
    answers = {};
    flags = {};
    indAnswers = {};
  }
  var answered = false;
  $("#nxtQ").hide();
  $("#explanation").hide();
  $("#explanation-text").hide();
  $("#excontainer").hide();
  var selected = "none";
  currentQ = "1";
  $("#a").click(function() {
    $("#a").css("background-color", "#727272");
    $("#b").css("background-color", "#d8d8d8");
    $("#c").css("background-color", "#d8d8d8");
    $("#d").css("background-color", "#d8d8d8");
    $("#e").css("background-color", "#d8d8d8");
    selected = "A";
    checkForNext();
  });
  $("#b").click(function() {
    $("#b").css("background-color", "#727272");
    $("#a").css("background-color", "#d8d8d8");
    $("#c").css("background-color", "#d8d8d8");
    $("#d").css("background-color", "#d8d8d8");
    $("#e").css("background-color", "#d8d8d8");
    selected = "B";
    checkForNext();
  });
  $("#c").click(function() {
    $("#c").css("background-color", "#727272");
    $("#b").css("background-color", "#d8d8d8");
    $("#a").css("background-color", "#d8d8d8");
    $("#d").css("background-color", "#d8d8d8");
    $("#e").css("background-color", "#d8d8d8");
    selected = "C";
    checkForNext();
  });
  $("#d").click(function() {
    $("#d").css("background-color", "#727272");
    $("#b").css("background-color", "#d8d8d8");
    $("#c").css("background-color", "#d8d8d8");
    $("#a").css("background-color", "#d8d8d8");
    $("#e").css("background-color", "#d8d8d8");
    selected = "D";
    checkForNext();
  });
  $("#e").click(function() {
    $("#e").css("background-color", "#727272");
    $("#b").css("background-color", "#d8d8d8");
    $("#c").css("background-color", "#d8d8d8");
    $("#d").css("background-color", "#d8d8d8");
    $("#a").css("background-color", "#d8d8d8");
    selected = "E";
    checkForNext();
  });

  function checkForNext() {
    if (selected == "none") {
      $('#check').prop('disabled', true);
    } else {
      $('#check').prop('disabled', false);
    }
  }
  checkForNext();
  $("#check").click(function() {
    answered = true;
    $("#check").hide();
    $("#explanation-text").text("The correct answer is " + cAns + ". " + explanQ);
    $("#explanation").show();
    $("#explanation-text").show();
    $("#excontainer").slideDown();
    if ($("#" + selected.toLowerCase()).hasClass("correctA")) {
      $("#" + selected.toLowerCase()).css("background-color", "#28a745");
      $("#explanation").text("Show Explanation ▼");
      $("#correctTxt").css("color", "#28a745");
      $("#correctTxt").text("Correct!");
      answers[doneQs] = "Correct";
    } else {
      $('.collapse').collapse("show");
      $("#explanation").text("Hide Explanation ▲");
      $("#" + cAns.toLowerCase()).css("background-color", "#28a745");
      $("#" + selected.toLowerCase()).css("background-color", "#dc3545");
      $("#explanation").text("Hide Explanation ▲");
      $("#correctTxt").text("Incorrect");
      $("#correctTxt").css("color", "#dc3545");
      answers[doneQs] = "Incorrect";
    }
    indAnswers[doneQs] = selected;
    if (doneQs == 10) {
      $("#btnText").text("Results");
    }
    $('#a').prop('disabled', true);
    $('#b').prop('disabled', true);
    $('#c').prop('disabled', true);
    $('#d').prop('disabled', true);
    $('#e').prop('disabled', true);
    $('#a').css('opacity', "1");
    $('#b').css('opacity', "1");
    $('#c').css('opacity', "1");
    $('#d').css('opacity', "1");
    $('#e').css('opacity', "1");
    $('#a').css('color', "#000000");
    $('#b').css('color', "#000000");
    $('#c').css('color', "#000000");
    $('#d').css('color', "#000000");
    $('#e').css('color', "#000000");
    $("#nxtQ").slideDown();
    updateFirebase();
  });
  $("#nxtQ").click(function() {
    $("#flag").trigger("click");
    $("#flag").trigger("click");
    flags[doneQs] = flagged;
    flagged = false;
    if (doneQs < 10) {
      loadQuestion(lastQ.slice(0, 3) + (doneQs + 1));
    } else {
      $(".hideWhenDone").hide();
      displayEnding();
    }
  });
  $('#explanation').click(function() {
    if ($("#explanation").text() == "Show Explanation ▼") {
      $("#explanation").text("Hide Explanation ▲");
      $("#info").collapse("show");
    } else if ($("#explanation").text() == "Hide Explanation ▲") {
      $("#explanation").text("Show Explanation ▼");
      $("#info").collapse("hide");
    }
  });
  doneQs = 0;

  function loadQuestion(qId) {
    resetFlag();
    doneQs = doneQs + 1;
    lastQ = qId;
    $("#nxtQ").hide();
    $("#explanation").hide();
    $("#explanation-text").hide();
    $("#excontainer").hide();
    $("#check").show();
    $('#a').css('background-color', "#dddddd");
    $('#b').css('background-color', "#dddddd");
    $('#c').css('background-color', "#dddddd");
    $('#d').css('background-color', "#dddddd");
    $('#e').css('background-color', "#dddddd");
    makeDisabled();
    if ($('#a').hasClass('correctA')) {
      $('#a').removeClass('correctA')
    }
    if ($('#b').hasClass('correctA')) {
      $('#b').removeClass('correctA')
    }
    if ($('#c').hasClass('correctA')) {
      $('#c').removeClass('correctA')
    }
    if ($('#d').hasClass('correctA')) {
      $('#d').removeClass('correctA')
    }
    if ($('#e').hasClass('correctA')) {
      $('#e').removeClass('correctA')
    }
    if ($('#a').hasClass('incorrectA')) {
      $('#a').removeClass('incorrectA')
    }
    if ($('#b').hasClass('incorrectA')) {
      $('#b').removeClass('incorrectA')
    }
    if ($('#c').hasClass('incorrectA')) {
      $('#c').removeClass('incorrectA')
    }
    if ($('#d').hasClass('incorrectA')) {
      $('#d').removeClass('incorrectA')
    }
    if ($('#e').hasClass('incorrectA')) {
      $('#e').removeClass('incorrectA')
    }
    $('.collapse').collapse("hide");
    selected = "none";
    justLoaded = qId;
    checkForNext();
    var gotQType = qId.slice(0, 3);
    firebase.database().ref().child("questions").child(gotQType).child("TEST1").child(qId).on('value', function(snapshot) {
      var datas = snapshot.val();
      var qTitle = "In the following sentence there is either one mistake or no mistake. Find the group of words with the mistake in it and select A, B, C or D. If there is no mistake, choose N.";
      var explan = datas.EX;
      var A = datas.A + "&nbsp;";
      var B = datas.B + "&nbsp;";
      var C = datas.C + "&nbsp;";
      var D = datas.D;
      var qText = "<table class='bluetable' style='width:100'><tr><th>" + A + "</th><th>" + B + "</th><th>" + C + "</th><th>" + D + "</th></tr><tr class='spacer'><td></td></tr><tr><td class='blues'>A</td><td class='blues'>B</td><td class='blues'>C</td><td class='blues'>D</td></tr><tr class='spacer'><td></td></tr></table>"
      cAns = datas.ANS;
      explanQ = explan;
      $("#questionimg").html(qText);
      $("#qInstructions").text(qTitle);
      $("#qNofN").text("Question " + doneQs + " of 10");
      if (cAns == "A") {
        $("#a").addClass("correctA");
        $("#b").addClass("incorrectA");
        $("#c").addClass("incorrectA");
        $("#d").addClass("incorrectA");
        $("#e").addClass("incorrectA");
      }
      if (cAns == "B") {
        $("#b").addClass("correctA");
        $("#a").addClass("incorrectA");
        $("#c").addClass("incorrectA");
        $("#d").addClass("incorrectA");
        $("#e").addClass("incorrectA");
      }
      if (cAns == "C") {
        $("#c").addClass("correctA");
        $("#b").addClass("incorrectA");
        $("#a").addClass("incorrectA");
        $("#d").addClass("incorrectA");
        $("#e").addClass("incorrectA");
      }
      if (cAns == "D") {
        $("#d").addClass("correctA");
        $("#b").addClass("incorrectA");
        $("#c").addClass("incorrectA");
        $("#a").addClass("incorrectA");
        $("#e").addClass("incorrectA");
      }
      if (cAns == "N") {
        $("#e").addClass("correctA");
        $("#b").addClass("incorrectA");
        $("#c").addClass("incorrectA");
        $("#d").addClass("incorrectA");
        $("#a").addClass("incorrectA");
      }
    });
  }
  lastQ = startingQuestion;
  if (lastQ.slice(3).toString().length == 1) {
    testNumb = "1";
  } else {
    testNumb = (lastQ.slice(3) - 10);
  }
  flagged = false;
  $("#flag").click(function() {
    if ($("#flag").html() == 'Flag Question <i class="far fa-flag"></i>') {
      $("#flag").html('Unflag Question <i class="fas fa-flag"></i>');
      flagged = true;
    } else if ($("#flag").html() == 'Unflag Question <i class="fas fa-flag"></i>') {
      $("#flag").html('Flag Question <i class="far fa-flag"></i>');
      flagged = false;
    }
  });

  function resetFlag() {
    $("#flag").html("Flag Question <i class='far fa-flag'></i>");
  }

  function displayEnding() {
    $("#done").fadeIn(500);
    for (var entry in answers) {
      if (flags[entry] == true) {
        qFlag = "⚑";
      } else {
        qFlag = "⚐";
      }
      $('#resultsTable tbody').append('<tr><th scope="row">' + "Question " + entry + '</th><td>' + answers[entry] + '</td><td>' + qFlag + '</td></tr>');
    }
    total = 0;
    marks = 0;
    for (var x = 1; x < 11; x++) {
      if (answers[x] == "Correct") {
        marks++;
        total++;
      } else {
        total++;
      }
    }
    sendScore(marks);
    $("#outOf").text("You scored " + marks + " out of " + total + ".");
    percent = ((marks / total) * 100);
    if (percent < 4) {
      $("#bottomText").text("Revise some more and complete this test again.");
    } else if (percent > 7) {
      $("#bottomText").text("Keep it up! You're doing great!");
    } else {
      $("#bottomText").text("Nearly there! Keep trying.");
    }
    var radialObj = radialIndicator($('#indicatorContainer'), {
      barColor: {
        0: '#FF0000',
        33: '#e0e028',
        66: '#0066FF',
        100: '#33CC33'
      },
      barWidth: 15,
      initValue: 0,
      roundCorner: true,
      percentage: true,
      radius: 125,
      barBgColor: "#adafb2",
      fontFamily: 'Roboto',
      frameTime: 20
    });
    $("#percentage").text(percent + "%");
    radialObj.animate(percent);
    radialObj.animate(percent);
    for (var i = 1; i < 11; i++) {
      if (flags[i] == true) {
        flagQ = "⚑"
      } else {
        flagQ = "";
      }
      $("#reviewGrid").append("<div id=" + 'item' + i + " class='reviewItem'><p style='display: inline-block;font-size:40px;padding-left: 8px;'>" + i + "</p><p style='display: inline-block;color: #d8d8d8;font-size: 30px;padding-left: 5px;'>" + flagQ + "</p></div>");
      if (answers[i] == "Correct") {
        addCSS = "#28a745";
      } else {
        addCSS = "#dc3545";
      }
      $("#item" + i).css("background-color", addCSS);
    }
    $("#item1").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 1), "all");
    });
    $("#item2").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 2), "all");
    });
    $("#item3").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 3), "all");
    });
    $("#item4").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 4), "all");
    });
    $("#item5").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 5), "all");
    });
    $("#item6").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 6), "all");
    });
    $("#item7").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 7), "all");
    });
    $("#item8").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 8), "all");
    });
    $("#item9").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 9), "all");
    });
    $("#item10").click(function() {
      $("#reviewAll").trigger("click");
      loadReviewQuestion((currentReviewQ.slice(0, 3) + 10), "all");
    });
    $("#previewModalNext").click(function() {
      if (curentReviewMode == "all") {
        loadReviewQuestion((currentReviewQ.slice(0, 3) + (parseInt(currentReviewQ.slice(3)) + 1)), "all");
      } else if (curentReviewMode == "IAndF") {
        for (var a = (parseInt(currentReviewQ.slice(-1)) + 1); a < 11; a++) {
          if (needReview[a] == true) {
            loadReviewQuestion((currentReviewQ.slice(0, 3) + a), "IAndF");
            break;
          }
        }
      } else {
        console.log("Please enter a vaild mode for the review modal.");
      }
    })
    $("#previewModalPrev").click(function() {
      if (curentReviewMode == "all") {
        loadReviewQuestion((currentReviewQ.slice(0, 3) + (parseInt(currentReviewQ.slice(3)) - 1)), "all");
      } else if (curentReviewMode == "IAndF") {
        parsedInt = 0;
        if (parseInt(currentReviewQ.slice(-1)) == 0) {
          parsedInt = 10;
        } else {
          parsedInt = parseInt(currentReviewQ.slice(-1));
        }
        for (var a = parsedInt - 1; a > 0; a = a - 1) {
          if (needReview[a] == true) {
            loadReviewQuestion((currentReviewQ.slice(0, 3) + a), "IAndF");
            break;
          }
        }
      } else {
        console.log("Please enter a vaild mode for the review modal.");
      }
    });
    needReview = {};
    for (var n = 1; n < 11; n++) {
      if ($("#item" + n).find("p").text().slice(-1) == "⚑") {
        needReview[n] = true;
      } else if ($("#item" + n).css("background-color") == "rgb(220, 53, 69)") {
        needReview[n] = true;
      } else {
        needReview[n] = false;
      }
    }
    var keys = Object.keys(needReview);
    var filtered = keys.filter(function(key) {
      return needReview[key];
    });
    loadReviewQuestion(startingQuestion, "all");
    try {
      loadReviewQuestion((startingQuestion.slice(0, 3) + toString(filtered)), "all");
    } catch (err) {
      loadReviewQuestion(startingQuestion, "all");
    }
  }

  function updateFirebase() {
    if ((lastQ.slice(3) - 1).toString().length == 1) {
      testNumber = "1";
    } else {
      testNumber = (lastQ.slice(3) - 10);
    }
    var date = new Date();
    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + "/" + "tests" + "/test" + testNumber).set({
      position: doneQs,
      lastActiveDay: date.getDate(),
      lastActiveMonth: MONTH_NAMES[date.getMonth()],
      lastActiveYear: date.getFullYear(),
      lastActiveMinute: date.getMinutes(),
      lastActiveHour: date.getHours(),
      answers: JSON.stringify(answers),
      indAnswers: JSON.stringify(indAnswers),
      flags: JSON.stringify(flags)
    });
  }

  function sendScore(score) {
    if ((lastQ.slice(3) - 1).toString().length == 1) {
      testNumber = "1";
    } else {
      testNumber = (lastQ.slice(3) - 10);
    }
    user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + "/" + "tests" + "/test" + testNumber).update({
      score: score
    });
  }

  function resetFirebase() {
    if (lastQ.slice(3).toString().length == 1) {
      testNumber = "1";
    } else {
      testNumber = (lastQ.slice(3) - 10);
    }
    user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + "/" + "tests" + "/" + testNumber).set({
      position: null,
      lastActiveDay: null,
      lastActiveMonth: null,
      lastActiveYear: null,
      lastActiveMinute: null,
      lastActiveHour: null,
      answers: null,
      indAnswers: null,
      flags: null
    });
  }

  function loadReviewQuestion(qId, mode) {
    curentReviewMode = mode;
    $("#mA").attr("class", "rMAnswers");
    $("#mB").attr("class", "rMAnswers");
    $("#mC").attr("class", "rMAnswers");
    $("#mD").attr("class", "rMAnswers");
    $("#mE").attr("class", "rMAnswers");
    $("#previewModalNext").show();
    $("#previewModalPrev").show();
    currentReviewQ = qId;
    var gotQType = qId.slice(0, 3);
    firebase.database().ref().child("questions").child(gotQType).child(qId).on('value', function(snapshot) {
      var datas = snapshot.val();
      var qTitle = datas.questionTitle;
      var explan = datas.explanation;
      var imageUrl = datas.questionImageUrl;
      var answerC = datas.correctAnswer;
      $("#reviewModalQuestionTitle").text(qTitle);
      $("#reviewModalBody").html(`<img style="width: 100%;"src="` + imageUrl + `"><div class="niceBox"style="justify-content: space-around;text-align:center;"><div id="mA"class="rMAnswers">A</div><div id="mB"class="rMAnswers">B</div><div id="mC"class="rMAnswers">C</div><div id="mD"class="rMAnswers">D</div><div id="mE"class="rMAnswers">E</div></div><h3 style="font-size: 20px;"><strong>Explanation</strong></h3><p>` + explan + "<p>");
      $("#m" + indAnswers[qId.slice(-1)]).addClass("wrong");
      $("#m" + answerC).attr("class", "rMAnswers");
      $("#m" + answerC).addClass("right");
    });
    if (currentReviewQ.slice(-1) == "1") {
      $("#previewModalPrev").hide();
      $("#previewModalNext").show();
    } else if (currentReviewQ.slice(-1) == "0") {
      $("#previewModalNext").hide();
      $("#previewModalPrev").show();
    } else {
      $("#previewModalNext").show();
      $("#previewModalPrev").show();
    }
    $("#reviewModalTitle").text("Review - Question " + currentReviewQ.slice(3));
  }
  $("#reviewAll").click(function() {
    loadReviewQuestion(startingQuestion, "all");
  });
  $("#reviewSome").click(function() {
    loadReviewQuestion(startingQuestion, "IAndF");
  });
  needReview = [];
  for (var n = 1; n < 11; n++) {
    if ($("#item" + n).find("p").text().slice(-1) == "⚑") {
      needReview[n] = true;
    } else if ($("#item" + n).css("background-color") == "rgb(220, 53, 69)") {
      needReview[n] = true;
    } else {
      needReview[n] = false;
    }
  }
  curentReviewMode = "all";
  loadQuestion(startingQuestion);
});
