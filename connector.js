/* global tableau reqwest */

(function() {
    // Dark Sky API Key
    var API_KEY = "c5a50d083981d1ecad8c5b22c76d2762";
    // Location of forecast (currently Hillsboro Airport, because there's a weather station there)
    var LOCATION = "45.535122,-122.948361";
    
    /* Schema for data to get from Dark Sky JSON */
    // id: attribute in Dark Sky JSON
    // alias: name of data value in Tableau table
    // dataType: Data type of value (see all at https://tableau.github.io/webdataconnector/docs/api_ref.html#webdataconnectorapi.datatypeenum)
    
    // Here are some example columns to get you started. Take a look at the actual data and fill the rest in!
    var cols = [{
            id: "time",
            alias: "Time",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "summary",
            alias: "Summary",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "precipProbability",
            alias: "Precipitation Probability",
            dataType: tableau.dataTypeEnum.float
        }];
    
    // Create the connector object
    var connector = tableau.makeConnector();

    // Define schema
    connector.getSchema = surfaceSchema => {
        /* Create schema with columns & some other attributes */
        // alias: Name of Data Source in Tableau
        var tableSchema = {
            id: "darkskyData",
            alias: "Weather",
            columns: cols
        };

        // Surface schema to Tableau
        surfaceSchema([tableSchema]);
    };

    // Download and format data
    connector.getData = (table, done) => {
        // Get data (gets 7-day hourly forcast (extended); excludes all other data)
        // Format: JSON-P

        // A reqwest call should go here!
    };

    // Surface connector to tableau library
    tableau.registerConnector(connector);
    
    // Run ready() when everything is loaded
    if (document.readyState != 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }


    // Create event listener for when user requests data
    function ready() {
        document.getElementById("submitButton").addEventListener("click", () => {
            // Set data source name
            tableau.connectionName = "Dark Sky Connector";
            // Submit connector to Tableau
            tableau.submit();
        });
    }

    function requestSuccess(response, table, done) {
        // Put your table row objects in here
        let tableData = [];

        // Format data objects in response and put them in tableData here!


        // Send data to Tableau and mark as complete
        table.appendRows(tableData);
        done();
    }
    
})();