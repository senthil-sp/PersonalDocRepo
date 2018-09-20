$(document).ready(function () {
    loadItems();
    

});



$(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
        $('#table_id_filter').fadeOut();
    } else {
        $('#table_id_filter').fadeIn();
    }
});





function loadItems() {
    var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('LegalForms')/items?$top=5000";
    $.ajax({
        url: oDataUrl,
        type: "GET",
        dataType: "json",
        headers: {
            "accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: mySuccHandler,
        error: myErrHandler
    });
    
    
}


function mySuccHandler(data) {
    try {
        var dataTableExample = $('#table_id').DataTable();
        if (dataTableExample != 'undefined') {
            dataTableExample.destroy();
        }
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        dataTableExample = $('#table_id').DataTable({
            "createdRow": function (row, data, dataIndex) {
                if (data['Key_x0020_Matter'] == "Critical") {
                    $(row).addClass('red');
                }
            },
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf', 'colvis'],
            "aaData": data.d.results,
            "aoColumns": [{
                    "mData": "Title"
                },
                {
                    "mData": "Id",
                    "render": function (mData) {
                        var value = new Object(mData);
                        return '<a href="../SitePages/LegalDisplayForm.aspx?itemid=' + value +
                            '"><img src="../SiteAssets/LegalForms/Images/ViewIcon.png" style="height:20px;width:20px;" title="View"/></a> &nbsp   <a href="../SitePages/LegalEditForm.aspx?itemid=' +
                            value +
                            '"><img src="../SiteAssets/LegalForms/Images/EditIcon.png" style="height:20px;width:20px;" title="Edit"/></a> &nbsp   <a href="../SitePages/LegalDeleteForm.aspx?itemid=' + value +
                            '"><img src="../SiteAssets/LegalForms/Images/DeleteIcon.png" style="height:20px;width:20px;" title="Delete"/></a>';

                    }

                },
                {
                    "mData": "Business_x0020_owner_x0020_Text"
                },
                {
                    "mData": "Region"
                },
                {
                    "mData": "Country"
                },
                {
                    "mData": "LegalType"
                },
                {
                    "mData": "ESS_x0020_owner_x0020_Text"
                },
                {
                    "mData": "Legal_x0020_owner_x0020_Text"
                },

                {
                    "mData": "Risk_x0020_profile"
                },
                {
                    "mData": "Currency"
                },
                {
                    "mData": "Value_x0020__x00a3__x0020__x0028"
                },
                {
                    "mData": "Key_x0020_Matter"
                },
                {
                    "mData": "Contract_x0020_Type"
                },
                {
                    "mData": "Description"
                },
                {
                    "mData": "Status",
                    "render": function (mData) {
                        if (mData == "Yet to Start") {
                            return '<div style="text-align:center;"><span style="background-color:#bfb1b1;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "In Progress") {
                            return '<div style="text-align:center;"><span style="background-color:#ddd844;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Review") {
                            return '<div style="text-align:center;"><span style="background-color:#f9c7f4;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Draft Completed") {
                            return '<div style="text-align:center;"><span style="background-color:#cedd8b;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Awaiting Business Inputs") {
                            return '<div style="text-align:center;"><span style="background-color:#60e5de;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Pending with External Party") {
                            return '<div style="text-align:center;"><span style="background-color:#e5b260;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Pending with External Counsel") {
                            return '<div style="text-align:center;"><span style="background-color:#e59c27;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "On Hold") {
                            return '<div style="text-align:center;"><span style="background-color:#f73c27;color:#fff">' +
                                mData + '</span></div>';
                        } else if (mData == "Completed") {
                            return '<div style="text-align:center;"><span style="background-color:#198726;color:#fff">' +
                                mData + '</span></div>';
                        } else {
                            return mData;
                        }
                    }
                },
                {
                    "mData": "Deadline",
                    "render": function (mData) {
                        if (mData == null) {
                            return ' ';
                        } else {
                            var date = new Date(mData);
                            var month = date.getMonth();
                            return date.getDate() + "-" + months[month] + "-" + date.getFullYear();
                        }

                    }
                },

                {
                    "mData": "Notes",
                    "render": function (mData) {
                        var html = "";
                        if (mData != null) {
                             html = overrideNotesfield(mData);
                        }
                      return html;
                    }
                }
            ],
            orderCellsTop: true, drawCallback: function(){
                $('.paginate_button', this.api().table().container())          
                   .on('click', function(){
                        readMore();
                   });       
            },
            initComplete: function () {
                this.api().columns([0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).every(function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d +
                            '</option>')
                    });
                });
            }
        });
        //dataTableExample.buttons().container().insertBefore('#table_id_filter'); //----jQuery code----
        dataTableExample.buttons().container().appendTo('#table_id_wrapper .col-sm-6:eq(0)');
        
    } catch (e) {
        alert(e.message);
    }
}


function overrideNotesfield(notes) {
    var showChar = 100;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";
    var spend = notes;
    var html = "<div class='more'>" + spend + "</div>";
    if (spend.length > showChar) {

        var c = spend.substr(0, showChar);
        var h = spend.substr(showChar, spend.length - showChar);

        var htmla = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span style="display: none;">' + h + '</span>&nbsp;&nbsp;<a href="#" onclick="hidedata(this);return false;" class="morelink">' + moretext + '</a></span>';

        html = htmla;
    }
    return html;
}

function hidedata(el) {
    var moretext = "Show more >";
    var lesstext = "Show less";
    if ($(el).hasClass("less")) {
        $(el).removeClass("less");
        $(el).html(moretext);
    }
    else {
        $(el).addClass("less");
        $(el).html(lesstext);
    }
    $(el).parent().prev().toggle();
    $(el).prev().toggle();
    return false;
}

function myErrHandler(data, errCode, errMessage) {
    alert("Error: " + errMessage);
}