function sortTable(table) { // Sort table by time
    return new Promise((resolve, reject)=>{
        try {
            rows = [].slice.call(table.rows,1); // Get all rows apart from the top row, which contains no meetings
            toprow = table.rows[0]; // Save this for later
            rows1 = []; // Initialise arrays for later
            rows2 = [];
    
            for (row of rows) { // iterate all meetings
                time = row.cells[0].innerText; // Store the time as text, eg. "11:05 AM"
                time = getMinutesFromTime(time); // Calculate minutes since beginning of day (00:00)
                rows1.push(time); // Add that amount to an array
            }
            rows12 = rows1.slice(0).sort() // Make a copy of that arry that is in order from smallest to largest
            for (row of rows12) { // iterate the sortetd array
                rows2.push(rows[rows1.indexOf(row)]) // Find the index of the iterated value in the original array, then correlate that index to the collection of rows
            }
            table.tBodies[0].innerHTML = ''; // Clear table
            table.tBodies[0].appendChild(toprow); // Add top row to the top
            for (row of rows2) {
                table.tBodies[0].appendChild(row); // Add next row to the bottom
            }
            resolve()
        }
        catch (reason) {
            reject(reason)
        }
    })
    
}