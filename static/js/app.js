// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
function handleClick() {
  // This function will replace your handleClick function
  // Save the element, value, and id of the filter that was changed
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value").toLowerCase();
  let state = d3.select("#state").property("value").toLowerCase();
  let country = d3.select("#country").property("value").toLowerCase();
  let shape = d3.select("#shape").property("value").toLowerCase();
  let filteredData = tableData;

  // If a filter value was entered then add that filterId and value
  if (date) {
    filteredData = filteredData.filter((row) => row.datetime === date);
  }
  if (city) {
    filteredData = filteredData.filter((row) => row.city === city);
  }
  if (state) {
    filteredData = filteredData.filter((row) => row.state === state);
  }
  if (country) {
    filteredData = filteredData.filter((row) => row.country === country);
  }
  if (shape) {
    filteredData = filteredData.filter((row) => row.shape === shape);
  }

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
