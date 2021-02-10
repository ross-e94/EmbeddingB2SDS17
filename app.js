console.log("app.js has loaded");
let viz;
let isVizHidden = false;
//TO DO LIST:
// create variables for the url, container and the options of the dashboard
// create a function that initialises the dashboard
// execute this function when the page loads
// create buttons to interact with export options

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

const vizContainer = document.getElementById("vizContainer");

const options = {
  device: "desktop",
  Category: "Furniture",
};

const pdfButton = document.getElementById("exportPDF");
// click on the button to export to PDF
pdfButton.addEventListener("click", function () {
  console.log("You clicked the button!");
  viz.showExportPDFDialog();
});

const excelButton = document.getElementById("exportToExcel");
// click button to export excel crosstab
excelButton.addEventListener("click", function () {
  console.log("You clicked the excel button!");
  viz.exportCrossTabToExcel();
});

//grab the button
// when you click the button hide the viz
// when you click the button update the text to show

const showHideButton = document.getElementById("showHideViz");
showHideButton.addEventListener("click", showHideHandler);

function showHideHandler() {
  if (isVizHidden === false) {
    console.log("You clicked the button");
    viz.hide();
    showHideButton.innerHTML = "Show Viz";
    isVizHidden = true;
  } else {
    console.log("You clicked the button");
    viz.show();
    showHideButton.innerHTML = "Hide Viz";
    isVizHidden = false;
  }
}

const applyFilterButton = document.getElementById("applyFilter");
applyFilterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("Sales", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter has been applied!"));
}

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();
