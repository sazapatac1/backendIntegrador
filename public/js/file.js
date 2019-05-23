$(document).ready(function () {

    $('#alertError').hide();

    $("#btnLogout").click(function () {
        Cookies.remove('token');
        Cookies.remove('userId');
        Cookies.remove('userName');
        Cookies.remove('userEmail');

        window.location.replace('/login');
    });


    $('#upload').click(function () {
        //Reference the FileUpload element.
        var fileUpload = $("#fileUpload")[0];

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                var data;
                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        data = ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        data = ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }

                callRequest(data);

            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    });

    function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
           
        var data = [];
        
        //Add the data rows from Excel file.
        for (var i = 0; i < excelRows.length; i++) {
            data[i] = excelRows[i];
        }

        return data;
    };

    function callRequest(data){

    };

});