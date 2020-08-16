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
function updateFilters() {
  // This function will replace your handleClick function
  // Save the element, value, and id of the filter that was changed
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value").toLowerCase().trim();
  let state = d3.select("#state").property("value").toLowerCase().trim();
  let country = d3.select("#country").property("value").toLowerCase().trim();
  let shape = d3.select("#shape").property("value").toLowerCase().trim();

  var filters = {
    datetime: date,
    city: city,
    state: state,
    country: country,
    shape: shape,
  };

  // Build the table when the page loads
  filterTable(filters);
}

function filterTable(filters) {
  // If a filter value was entered then add that filterId and value
  let filterData = tableData;

  Object.entries(filters).forEach(([key, val]) => {
    if (val) {
      filterData = filterData.filter((row) => row[key] === val);
    }
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filterData);
}

let filterData = tableData;
buildTable(filterData);

// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);

//Make a clear button that resets the page
var clearData = d3.select("#clear-btn");
clearData.on("click", function () {
  location.reload();
});
