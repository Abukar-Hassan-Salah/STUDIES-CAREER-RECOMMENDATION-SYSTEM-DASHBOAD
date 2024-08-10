function calculateScores() {
  var mth = parseFloat(document.getElementById("math_score").value);
  var his = parseFloat(document.getElementById("history_score").value);
  var phy = parseFloat(document.getElementById("physics_score").value);
  var che = parseFloat(document.getElementById("chemistry_score").value);
  var bio = parseFloat(document.getElementById("biology_score").value);
  var eng = parseFloat(document.getElementById("english_score").value);
  var goe = parseFloat(document.getElementById("geography_score").value);

  var ts = mth + his + phy + che + bio + eng + goe;
  var av = ts / 7;

  document.getElementById("total_score").value = ts.toFixed(2);
  document.getElementById("average_score").value = av.toFixed(2);
}

$(document).ready(function () {
  $("#form").submit(function (event) {
    event.preventDefault();

    // Get form data

    var formData = $("#form").serialize();
    // Get form data

    var absence_days = parseFloat($("#absence_days").val());
    var weekly_self_study_hours = parseFloat(
      $("#weekly_self_study_hours").val()
    );
    var math_score = parseFloat($("#math_score").val());
    var history_score = parseFloat($("#history_score").val());
    var physics_score = parseFloat($("#physics_score").val());
    var chemistry_score = parseFloat($("#chemistry_score").val());
    var biology_score = parseFloat($("#biology_score").val());
    var english_score = parseFloat($("#english_score").val());
    var geography_score = parseFloat($("#geography_score").val());

    var totalScore =
      math_score +
      history_score +
      physics_score +
      chemistry_score +
      biology_score +
      english_score +
      geography_score;
    var averageScore = totalScore / 7;

    document.getElementById("total_score").value = totalScore.toFixed(2);
    document.getElementById("average_score").value = averageScore.toFixed(2);

    // Perform form validation
    if (absence_days  < 0 || absence_days >= 31) {
      showErrorToast("Absence Days must be between 0 and 30");
      return;
    } else if (
      !weekly_self_study_hours ||
      weekly_self_study_hours < 0 ||
      weekly_self_study_hours > 168
    ) {
      showErrorToast("Weekly Self Study Hours must be between 0 and 168");
      return;
    } else if (!math_score || math_score < 0 || math_score > 100) {
      showErrorToast("Math Score must be between 0 and 100");
      return;
    } else if (!history_score || history_score < 0 || history_score > 100) {
      showErrorToast("History Score must be between 0 and 100");
      return;
    } else if (!physics_score || physics_score < 0 || physics_score > 100) {
      showErrorToast("Physics Score must be between 0 and 100");
      return;
    } else if (
      !chemistry_score ||
      chemistry_score < 0 ||
      chemistry_score > 100
    ) {
      showErrorToast("Chemistry Score must be between 0 and 100");
      return;
    } else if (!biology_score || biology_score < 0 || biology_score > 100) {
      showErrorToast("Biology Score must be between 0 and 100");
      return;
    } else if (!english_score || english_score < 0 || english_score > 100) {
      showErrorToast("English Score must be between 0 and 100");
      return;
    } else if (
      !geography_score ||
      geography_score < 0 ||
      geography_score > 100
    ) {
      showErrorToast("Geography Score must be between 0 and 100");
      return;
    }

    // Send AJAX request to server
    $.ajax({
      type: "POST",
      url: "/pred",
      data: formData,
      success: function (response) {
        console.log(response);
        // Update the #result div with the response data
        var resultHtml = `
         
               <div class="container mt-5">
          <div class="report-container">
            <h2 class="report-header text-center p-4 text-white" style="background-color: #11175c;">Recommendation Report</h2>
            <div class="container p-4 mb-4 rounded-md" style="background-color: #f8f9fa;">
              <div class="row">
                <div class="col-sm-12">
                  <div class="card shadow-sm">
                    <div class="table-responsive" id="printArea">
                      <table class="table table-bordered table-hover text-left">
                        <tbody>
                          
                          <tr>
                            <th scope="row">Math Score</th>
                            <td id="mathScore">${math_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">History Score</th>
                            <td id="historyScore">${history_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">Physics Score</th>
                            <td id="physicsScore">${physics_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">Chemistry Score</th>
                            <td id="chemistryScore">${chemistry_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">Biology Score</th>
                            <td id="biologyScore">${biology_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">English Score</th>
                            <td id="englishScore">${english_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">Geography Score</th>
                            <td id="geographyScore">${geography_score}</td>
                          </tr>
                          <tr>
                            <th scope="row">Total Score</th>
                            <td id="totalScore">${totalScore}</td>
                          </tr>
                          <tr>
                            <th scope="row">Average Score</th>
                            <td id="averageScore">${averageScore.toFixed(
                              2
                            )}%</td>
                          </tr>
                          <tr>
                            <th scope="row">Top Recommended Studies</th>
                            <th scope="row">Possible Probability</th>
                          </tr>
                          <tr>
                            <td id="rec1">${response.recommendations[0][0]}</td>
                            <td id="prob1">${(
                              response.recommendations[0][1] * 100
                            ).toFixed(2)}%</td>
                          </tr>
                          <tr>
                            <td id="rec2">${response.recommendations[1][0]}</td>
                            <td id="prob2">${(
                              response.recommendations[1][1] * 100
                            ).toFixed(2)}%</td>
                          </tr>

                          <tr>
                            <td id="rec2">${response.recommendations[2][0]}</td>
                            <td id="prob2">${(
                              response.recommendations[2][1] * 100
                            ).toFixed(2)}%</td>
                          </tr>

                          
                          <tr>
                            <td id="rec2">${response.recommendations[3][0]}</td>
                            <td id="prob2">${(
                              response.recommendations[3][1] * 100
                            ).toFixed(2)}%</td>
                          </tr>

                          
                          <tr>
                            <td id="rec2">${response.recommendations[4][0]}</td>
                            <td id="prob2">${(
                              response.recommendations[4][1] * 100
                            ).toFixed(2)}%</td>
                          </tr>
                        
                          
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="col-12 mt-4 mb-4 text-center w-full">
                  <button class="btn btn-success text-light mx-2" id="printStatement"><i class="fas fa-print text-light"></i> Print Report</button>
                  <button class="btn btn-info text-light mx-2" id="exportStatement"><i class="fas fa-file-excel text-light"></i> Export Report</button>
                </div>

                


       


              </div>
            </div>
          </div>
        </div>
                      `;

        $("#result").html(resultHtml);
      },
      error: function (xhr, _, error) {
        console.error(error);
        showErrorToast("Error occurred during prediction: " + error);
      },
    });
  });

  function showErrorToast(message) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: message,
    });
  }

  $(document).on("click", "#printStatement", function () {
    printStatement();
  });

  $(document).on("click", "#exportStatement", function () {
    exportStatement();
  });

  // Print the report
  function printStatement() {
    var printContents = document.getElementById("printArea").innerHTML;
    var originalContents = document.body.innerHTML;
    var printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print Report</title>");
    printWindow.document.write(
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    document.body.innerHTML = originalContents;
  }

  // Export the report
  function exportStatement() {
    var printArea = document.getElementById("printArea");

    html2canvas(printArea).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");

      // Access jsPDF using the UMD pattern
      const { jsPDF } = window.jspdf;
      var pdf = new jsPDF("p", "mm", "a4");
      var pdfWidth = pdf.internal.pageSize.getWidth();
      var pdfHeight = pdf.internal.pageSize.getHeight();

      var imgWidth = canvas.width;
      var imgHeight = canvas.height;
      var aspectRatio = imgWidth / imgHeight;

      // Calculate the new image size to fit the PDF page
      var newImgWidth = pdfWidth;
      var newImgHeight = pdfWidth / aspectRatio;

      // Adjust the new height if it exceeds the page height
      if (newImgHeight > pdfHeight) {
        newImgHeight = pdfHeight;
        newImgWidth = pdfHeight * aspectRatio;
      }

      // Add the image to the PDF at the top
      pdf.addImage(imgData, "PNG", 0, 0, newImgWidth, newImgHeight);

      // Save the PDF
      pdf.save("report.pdf");
    });
  }
});

`
      <style>
      .report-container {
          background-color: #ffffff; /* Changed to white for a cleaner look */
          border-radius: 10px;
          padding: 20px;
          margin-top: 10px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Increased shadow for more depth */
      }
      .report-header {
          background-color: #007bff; /* Changed to a vibrant blue */
          color: #fff;
          padding: 20px; /* Increased padding for better spacing */
          border-radius: 10px 10px 0 0;
          text-align: center; /* Centered text */
          font-size: 1.5em; /* Increased font size */
      }
      .table thead th {
          background-color: #007bff; /* Changed to match header color */
          color: #fff;
          text-align: center; /* Centered text */
      }
      .table tbody tr:nth-child(odd) {
          background-color: #f2f2f2; /* Alternating row colors for readability */
      }
      .table tbody tr:hover {
          background-color: #e9ecef; /* Highlight row on hover */
      }
      .btn {
          border-radius: 5px; /* Rounded buttons */
          padding: 10px 20px; /* Increased padding */
          font-size: 1em; /* Increased font size */
      }
      .btn-success {
          background-color: #28a745; /* Vibrant green */
          border: none;
      }
      .btn-info {
          background-color: #17a2b8; /* Vibrant cyan */
          border: none;
      }
      </style>`;




      