var listname = "CDBDocs";
var inputID;
var valCustomer;
var listItemId;
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
$(document).ready(function () {
    inputID = GetParameterValues('itemid');
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/Lists/GetByTitle('Contract Database')/items?$filter=UniqueId0 eq '" + inputID + "'",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            valCustomer = data.d.results[0].Customer;
            listItemId = data.d.results[0].Id;
            $("#txtContractRef").val(data.d.results[0].Title).attr('readonly', true);
            $("#txtAgreementName").val(data.d.results[0].Agreement_x0020_Name);
            $("#txtOpportunityNo").val(data.d.results[0].Opportunity_x0020_No);
            $("#ddlRegion").val(data.d.results[0].Region);
            $("#ddlSector").val(data.d.results[0].Sector);
            $("#txtCustomerLegalEntity").val(data.d.results[0].Customer_x0020_Legal_x0020_Entit);
            $("#ddlWLTLegalEntity").val(data.d.results[0].WLT_x0020_Legal_x0020_Entity);
            $("#ddlContractSigned").val(data.d.results[0].Contract_x0020_Signed);
            $("#ddlWLTExclusivity").val(data.d.results[0].WLT_x0020_Exclusivity);
            $("#ddlCodeofConductAgreed").val(data.d.results[0].Code_x0020_of_x0020_Conduct_x002);
            $("#ddlMasterContractOther").val(data.d.results[0].Master_x0020_Contract_x0020__x00);
            $("#ddlContractType").val(data.d.results[0].Contract_x0020_Type);
            $("#ddlOriginalOperationsCommenced").val(data.d.results[0].Original_x0020_Operations_x0020_);
            $("#dtpStartDate").val(dateFormatter(data.d.results[0].Start_x0020_Date));
            $("#txtIntitialTerm").val(data.d.results[0].Intitial_x0020_Term_x0020__x0028);
            $("#txtNoticePeriod").val(data.d.results[0].Notice_x0020_Period_x0020__x0028);
            $("#dtpNextEndBreakDate").val(dateFormatter(data.d.results[0].Next_x0020_End_x0020__x002f__x00));
            $("#txtExtensionTerm").val(data.d.results[0].Extension_x0020_Term_x0020__x002);
            $("#ddlAfterenddateextensionallowed").val(data.d.results[0].After_x0020_end_x0020_date_x002c);
            $("#ddlMaxNumberofExtensions").val(data.d.results[0].Max_x0020_Number_x0020_of_x0020_);
            $("#dtpLastNoticeDate").val(dateFormatter(data.d.results[0].Last_x0020_notice_x0020_date));
            $("#ddlCountry").val(data.d.results[0].Country);
            $("#txtPrimarySiteFacility").val(data.d.results[0].Primary_x0020_Site_x0020__x002f_);
            //people picker assign value back
            var AccountManagerId = data.d.results[0].Account_x0020_ManagerId;
            if (AccountManagerId != null) {
                var AsiteUserId = getbyuserid(AccountManagerId);
                AsiteUserId.done(function (data, textStatus, jqXHR) {
                    $("#pplAccountManager").spPeoplePicker(data.d);
                });
                AsiteUserId.fail(function (jqXHR, textStatus, errorThrown) {
                    var response = JSON.parse(jqXHR.responseText);
                    var message = response ? response.error.message.value : textStatus;
                    alert("Call failed. Error: " + message);
                });
            }

            var financeManagerId = data.d.results[0].Finance_x0020_ManagerId;
            if (financeManagerId != null) {
                var FsiteUserId = getbyuserid(financeManagerId);
                FsiteUserId.done(function (data, textStatus, jqXHR) {
                    $("#pplFinanceManager").spPeoplePicker(data.d);
                });
                FsiteUserId.fail(function (jqXHR, textStatus, errorThrown) {
                    var response = JSON.parse(jqXHR.responseText);
                    var message = response ? response.error.message.value : textStatus;
                    alert("Call failed. Error: " + message);

                });
            }
            var ContractManagerId = data.d.results[0].Contract_x0020__x002f__x0020_SitId;
            if (ContractManagerId != null) {
                var CsiteUserId = getbyuserid(ContractManagerId);
                CsiteUserId.done(function (data, textStatus, jqXHR) {
                    $("#pplContractSiteManager").spPeoplePicker(data.d);
                });
                CsiteUserId.fail(function (jqXHR, textStatus, errorThrown) {
                    var response = JSON.parse(jqXHR.responseText);
                    var message = response ? response.error.message.value : textStatus;
                    alert("Call failed. Error: " + message);
                });
            }
            var LegalManagerId = data.d.results[0].Legal_x0020_Services_x0020_ContaId;
            if (LegalManagerId != null) {
                var LsiteUserId = getbyuserid(LegalManagerId);
                LsiteUserId.done(function (data, textStatus, jqXHR) {
                    $("#pplLegalServicesContact").spPeoplePicker(data.d);
                });
                LsiteUserId.fail(function (jqXHR, textStatus, errorThrown) {
                    var response = JSON.parse(jqXHR.responseText);
                    var message = response ? response.error.message.value : textStatus;
                    alert("Call failed. Error: " + message);
                });
            }
            //people picker assign value back
            $("#tareaAdditionalLocations").val(data.d.results[0].Additional_x0020_Locations);
            $("#txtOtherContactsEmail1").val(data.d.results[0].Other_x0020_Contacts_x0020__x002);
            $("#txtOtherContactsEmail2").val(data.d.results[0].Other_x0020_Contacts_x0020__x0020);
            $("#txtOtherContactsEmail3").val(data.d.results[0].Other_x0020_Contacts_x0020__x0021);
            $("#txtOtherContactsEmail4").val(data.d.results[0].Other_x0020_Contacts_x0020__x0022);
            $("#tareaSummaryComments").val(data.d.results[0].Comments);
            $("#ddlLocalCurrency").val(data.d.results[0].Local_x0020_Currency);
            $("#ddlInvoicingCurrency").val(data.d.results[0].Invoicing_x0020_Currency);
            $("#ddlChargingMechanism").val(data.d.results[0].Charging_x0020_Mechanism);
            $("#ddlInvoiceFrequency").val(data.d.results[0].Invoice_x0020_Frequency);
            $("#txtContractualPaymentTerms").val(data.d.results[0].Contractual_x0020_Payment_x0020_);
            $("#ddlWLTlatepaymentcharge").val(data.d.results[0].WLT_x0020_late_x0020_payment_x00);
            $("#ddlLatePaymentInterest").val(data.d.results[0].Late_x0020_Payment_x0020_Interes);
            $("#txtRevenue").val(data.d.results[0].Revenue_x0020__x0028_local_x0020);
            $("#txtGrossProfit").val(data.d.results[0].Gross_x0020_Profit_x0020__x0028_);
            $("#txtExpectedRevenue").val(data.d.results[0].Expected_x0020_Revenue_x0020__x0);
            $("#txtExpectedProfit").val(data.d.results[0].Expected_x0020_Profit_x0020__x00);
            $("#ddlInflationPriceChargeRecovery").val(data.d.results[0].Inflation_x0020_Price_x0020_Char);
            $("#ddlGeneralDirectLosses").val(data.d.results[0].General_x0020_Direct_x0020_Losse);
            $("#ddlProductStockDirectLosses").val(data.d.results[0].Product_x0020__x002f__x0020_Stoc0);
            $("#ddlProductStockOwner").val(data.d.results[0].Product_x0020__x002f__x0020_Stoc);
            $("#txtIndirectConsequentialDamages").val(data.d.results[0].Indirect_x002f_Consequential_x00);
            $("#ddlInsuranceRequirements").val(data.d.results[0].Insurance_x0020_Requirements);
            $("#ddlIndemnification").val(data.d.results[0].Indemnification);
            $("#ddlServiceLines").val(JSON.parse(data.d.results[0].Service_x0020_Lines));
            $("#ddlObligations").val(JSON.parse(data.d.results[0].Obligations));
            $("#ddlKPISLAFailurePenalty").val(data.d.results[0].KPI_x0020__x002f__x0020_SLA_x002);
            $("#ddlWLTClientSoftware").val(data.d.results[0].WLT_x0020__x002f__x0020_Client_x);
            $("#ddlPreemploymentScreening").val(data.d.results[0].Pre_x002d_employment_x0020_Scree);
            $("#ddlTransferringInEmployeeIndemnity").val(data.d.results[0].Transferring_x0020_In_x0020_Empl);
            $("#ddlRedundancyRecovery").val(data.d.results[0].Redundancy_x0020_Recovery);
            $("#ddlTransferringOutEmployeeIndemnity").val(data.d.results[0].Transferring_x0020_Out_x0020_Emp);
            $("#ddlRecruitementFee").val(data.d.results[0].Recruitement_x0020_Fee);
            $("#ddlTerminationNotification").val(data.d.results[0].Termination_x0020_Notification);
            $("#ddlTerminationProvisions").val(JSON.parse(data.d.results[0].Termination_x0020_Provisions));
            $("#ddlTerminationRights").val(data.d.results[0].Termination_x0020_Rights);
            $("#txtTerminationPenalties").val(data.d.results[0].Termination_x0020_Penalties);
            $("#tareaDetailComments").val(data.d.results[0].Comments_x0020__x002f__x0020_Not);
            loadAttachments();
        },
        error: function (error) {
            alert("Error: " + JSON.stringify(error));
        }
    });
    if (SP.ClientContext != null) {
        SP.SOD.executeOrDelayUntilScriptLoaded(loadCustomerList, 'SP.js');
    }
    else {
        SP.SOD.executeFunc('sp.js', null, loadCustomerList);
    }

    function getbyuserid(id) {
        var userId = $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + id + ")",
            type: "GET",
            headers: {
                Accept: "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        });
        return userId;
    }



    function loadCustomerList() {

        var clientContext = new SP.ClientContext.get_current();
        var oWeb = clientContext.get_web();
        var oList = oWeb.get_lists().getByTitle('CustomerList');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            "<View><Query><OrderBy><FieldRef Name='ID' /></OrderBy></Query></View><Query>");
        var oListItemCollection = oList.getItems(camlQuery);
        clientContext.load(oListItemCollection, 'Include(Title)');
        clientContext.executeQueryAsync(function onSuccess() {
            var listItemEnumerator = oListItemCollection.getEnumerator();
            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                $("#ddlCustomer").append("<option value='" + oListItem.get_item('Title') + "'>" + oListItem.get_item('Title') + "</option>");

            }
            $("#ddlCustomer").val(valCustomer);
        }, function onFailure(sender, args) {
            console.log("Error" + args.get_stackTrace());
        });
    }

    $("#Upload").click(function () {
        var FileName = $("#txtFileName").val();
        var Type = $("#ddlType").val();
        var DateEffective = ($("#dtpDateEffective").val() == '') ? null : $("#dtpDateEffective").val();
        var Version = $("#txtVersion").val();
        var FileComments = $("#tareaFileComments").val();
        var file = $("#AddFiles")[0].files[0];
        var parts = $("#AddFiles").val().split("\\");
        var Name = parts[parts.length - 1];
        var FileTitle = Name.split(".");
        var reader = new FileReader();
        reader.onload = function (e) {
            addItem(e.target.result, Name);
        }
        reader.onerror = function (e) {
            alert(e.target.error);

        }
        reader.readAsArrayBuffer(file);

        function addItem(buffer, Name) {
            var call = uploadDocument(buffer, Name);
            call.done(function (data, textStatus, jqXHR) {
                var call2 = getItem(data.d);
                call2.done(function (data, textStatus, jqXHR) {
                    var item = data.d;
                    var call3 = updateItemFields(item);
                    call3.done(function (data, textStatus, jqXHR) {
                        alert("File Uploaded successfully!");
                        //debugger;
                        console.log("File Uploaded successfully! - FileName:" + Name);
                        var fileitemUrl = getEncodedUrl(item.Id);
                        fileitemUrl.done(function (data, textStatus, jqXHR) {
                            console.log(data.d.EncodedAbsUrl);
                            var newType = Type == null ? '' : Type;
                            var newDateEffective = DateEffective == null ? '' : dateFormatter(DateEffective);
                            var deleteVar = "deleteItem";
                            $("#fileList").append("<tr id='" + item.Id + "'><td><a href='" + data.d.EncodedAbsUrl + "'>" + Name + "</td><td>" + FileName + "</td><td>" + newType + "</td><td>" + newDateEffective + "</td><td>" + Version + "</td><td>" + FileComments + "</td><td><img src='../SiteAssets/Images/remove.jpg' style='height:25px;width:25px;cursor:pointer;' onclick='" + deleteVar + "(" + item.Id + ")" + "' /></td></tr>");
                            $("#txtFileName").val('');
                            $("#ddlType").val('');
                            $("#dtpDateEffective").val('');
                            $("#txtVersion").val('');
                            $("#tareaFileComments").val('');
                            $("#AddFiles").val('');
                        });
                        fileitemUrl.fail(function (jqXHR, textStatus, errorThrown) {
                            failHandler(jqXHR, textStatus, errorThrown);
                        });
                    });
                    call3.fail(function (jqXHR, textStatus, errorThrown) {
                        failHandler(jqXHR, textStatus, errorThrown);
                    });
                });
                call2.fail(function (jqXHR, textStatus, errorThrown) {
                    failHandler(jqXHR, textStatus, errorThrown);
                });
            });
            call.fail(function (jqXHR, textStatus, errorThrown) {
                failHandler(jqXHR, textStatus, errorThrown);
            });
        }
        function getEncodedUrl(id) {
            var fileUrl = $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CDBDocs')/Items(" + id + ")?$select=EncodedAbsUrl",
                type: "GET",
                headers: {
                    Accept: "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                }
            });
            return fileUrl;
        }

        function uploadDocument(buffer, Name) {
            var url = String.format(
                "{0}/_api/Web/Lists/getByTitle('" + listname + "')/RootFolder/Files/Add(url='{1}', overwrite=true)",
                _spPageContextInfo.webAbsoluteUrl, Name);
            var call = $.ajax({
                url: url,
                type: "POST",
                data: buffer,
                processData: false,
                headers: {
                    Accept: "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()

                }
            });

            return call;
        }

        function getItem(file) {
            var call = $.ajax({
                url: file.ListItemAllFields.__deferred.uri,
                type: "GET",
                dataType: "json",
                headers: {
                    Accept: "application/json;odata=verbose"
                }
            });

            return call;
        }

        function updateItemFields(item) {
            var call = $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl +
                    "/_api/Web/Lists/getByTitle('" + listname + "')/Items(" +
                    item.Id + ")",
                type: "POST",
                data: JSON.stringify({
                    "__metadata": { type: "SP.Data.CDBDocsItem" },
                    File_x0020_Name: FileName,
                    Date_x0020_Effective: DateEffective,
                    FileType: Type,
                    FileVersion: Version,
                    UniqueId0: inputID,
                    FileComments: FileComments
                }),
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "IF-MATCH": item.__metadata.etag,
                    "X-Http-Method": "MERGE"
                }
            });

            return call;
        }

        function failHandler(jqXHR, textStatus, errorThrown) {
            var response = JSON.parse(jqXHR.responseText);
            var message = response ? response.error.message.value : textStatus;
            alert("Call failed. Error: " + message);
        }

    });

    $("#btnSubmit").on('click', function (e) {
        if (isPageValid()) {
            e.preventDefault();
            $("#btnSubmit").attr("disabled", true);
            var $this = $(this);
            $this.button('loading');
            //Summary tab
            //client&scope section
            var clientContext = new SP.ClientContext.get_current();
            var oWeb = clientContext.get_web();
            var list = oWeb.get_lists().getByTitle('Contract Database');
            

            var Customer = $("#ddlCustomer").val();
            var AgreementName = $("#txtAgreementName").val();
            var OpportunityNo = $("#txtOpportunityNo").val();
            var Region = $("#ddlRegion").val();
            var Sector = $("#ddlSector").val();
            var CustomerLegalEntity = $("#txtCustomerLegalEntity").val();
            var WLTLegalEntity = $("#ddlWLTLegalEntity").val();
            var ContractSigned = $("#ddlContractSigned").val();
            var WLTExclusivity = $("#ddlWLTExclusivity").val();
            var CodeofConductAgreed = $("#ddlCodeofConductAgreed").val();
            var MasterContractOther = $("#ddlMasterContractOther").val();

            //term section
            var ContractType = $("#ddlContractType").val();
            var OriginalOperationsCommenced = $("#ddlOriginalOperationsCommenced").val();
            var StartDate = $("#dtpStartDate").val();
            var IntitialTerm = $("#txtIntitialTerm").val();
            var NoticePeriod = $("#txtNoticePeriod").val();
            var NextEndBreakDate = $("#dtpNextEndBreakDate").val();
            var ExtensionTerm = $("#txtExtensionTerm").val();
            var Afterenddateextensionallowed = $("#ddlAfterenddateextensionallowed").val();
            var MaxNumberofExtensions = $("#ddlMaxNumberofExtensions").val();
            var LastNoticeDate = $("#dtpLastNoticeDate").val();

            //Location & Key Contacts section
            var Country = $("#ddlCountry").val();
            //var AccountManager = $("#pplAccountManager").val();
            var PrimarySiteFacility = $("#txtPrimarySiteFacility").val();
            // var FinanceManager = $("#pplFinanceManager").val();
            var AdditionalLocations = $("#tareaAdditionalLocations").val();
            //var ContractSiteManager = $("#pplContractSiteManager").val();
            //var LegalServicesContact = $("#pplLegalServicesContact").val();
            var SummaryOtherContactsEmail1 = $("#txtOtherContactsEmail1").val();
            var SummaryOtherContactsEmail2 = $("#txtOtherContactsEmail2").val();
            var SummaryOtherContactsEmail3 = $("#txtOtherContactsEmail3").val();
            var SummaryOtherContactsEmail4 = $("#txtOtherContactsEmail4").val();
            var SummaryComments = $("#tareaSummaryComments").val();

            //detail tab
            //Invoicing section                  
            var LocalCurrency = $("#ddlLocalCurrency").val();
            var InvoicingCurrency = $("#ddlInvoicingCurrency").val();
            var ChargingMechanism = $("#ddlChargingMechanism").val();
            var InvoiceFrequency = $("#ddlInvoiceFrequency").val();
            var ContractualPaymentTerms = $("#txtContractualPaymentTerms").val();
            var WLTlatepaymentcharge = $("#ddlWLTlatepaymentcharge").val();
            var LatePaymentInterest = $("#ddlLatePaymentInterest").val();
            var PaymentTerm = $("#txtPaymentTerm").val();

            //Performance (Annual) section
            var Revenue = $("#txtRevenue").val();
            var GrossProfit = $("#txtGrossProfit").val();

            //Commercial, Revenue & Profit section
            var ExpectedRevenue = $("#txtExpectedRevenue").val();
            var ExpectedProfit = $("#txtExpectedProfit").val();
            var InflationPriceChargeRecovery = $("#ddlInflationPriceChargeRecovery").val();

            //Liabilities section
            var GeneralDirectLosses = $("#ddlGeneralDirectLosses").val();
            var ProductStockDirectLosses = $("#ddlProductStockDirectLosses").val();
            var ProductStockOwner = $("#ddlProductStockOwner").val();
            var IndirectConsequentialDamages = $("#txtIndirectConsequentialDamages").val();
            var InsuranceRequirements = $("#ddlInsuranceRequirements").val();
            var Indemnification = $("#ddlIndemnification").val();

            //Service section
            var ServiceLines = $("#ddlServiceLines").val();
            var Obligations = $("#ddlObligations").val();
            var KPISLAFailurePenalty = $("#ddlKPISLAFailurePenalty").val();
            var WLTClientSoftware = $("#ddlWLTClientSoftware").val();

            //Employee section
            var PreemploymentScreening = $("#ddlPreemploymentScreening").val();
            var TransferringInEmployeeIndemnity = $("#ddlTransferringInEmployeeIndemnity").val();
            var RedundancyRecovery = $("#ddlRedundancyRecovery").val();
            var TransferringOutEmployeeIndemnity = $("#ddlTransferringOutEmployeeIndemnity").val();
            var RecruitementFee = $("#ddlRecruitementFee").val();

            //Termination section
            var TerminationNotification = $("#ddlTerminationNotification").val();
            var TerminationProvisions = $("#ddlTerminationProvisions").val();
            var TerminationRights = $("#ddlTerminationRights").val();
            var TerminationPenalties = $("#txtTerminationPenalties").val();
            var DetailComments = $("#tareaDetailComments").val();

            //pplAccountManager
            var amuserDisplayName = $("#pplAccountManager").getUserDisplayName();
            var amuserLoginName = $("#pplAccountManager").getUserLoginName();
            var user_name= amuserLoginName.split("|")[1];
            var amUser = oWeb.ensureUser(user_name);
            //var amUser = clientContext.get_web().get_siteUsers().getByLoginName(amuserLoginName);
            clientContext.load(amUser);

            //pplFinanceManager
            var fmuserDisplayName = $("#pplFinanceManager").getUserDisplayName();
            var fmuserLoginName = $("#pplFinanceManager").getUserLoginName();
            user_name= fmuserLoginName.split("|")[1];
            var fmUser = oWeb.ensureUser(user_name);
            //var fmUser = clientContext.get_web().get_siteUsers().getByLoginName(fmuserLoginName);
            clientContext.load(fmUser);

            //pplContractSiteManager
            var csmuserDisplayName = $("#pplContractSiteManager").getUserDisplayName();
            var csmuserLoginName = $("#pplContractSiteManager").getUserLoginName();
            user_name= csmuserLoginName.split("|")[1];
            var csmUser = oWeb.ensureUser(user_name);
            //var csmUser = clientContext.get_web().get_siteUsers().getByLoginName(csmuserLoginName);
            clientContext.load(csmUser);

            //pplContractSiteManager
            var lscuserDisplayName = $("#pplLegalServicesContact").getUserDisplayName();
            var lscuserLoginName = $("#pplLegalServicesContact").getUserLoginName();
            user_name= lscuserLoginName.split("|")[1];
            var lscUser = oWeb.ensureUser(user_name);
            //var lscUser = clientContext.get_web().get_siteUsers().getByLoginName(lscuserLoginName);
            clientContext.load(lscUser);

            clientContext.executeQueryAsync(onUsersSuccess, onUsersFail);
            function onUsersSuccess() {
                var listItem = list.getItemById(listItemId);
                listItem.set_item('Customer', Customer);
                listItem.set_item('Agreement_x0020_Name', AgreementName);
                listItem.set_item('Region', Region);
                listItem.set_item('Sector', Sector);
                listItem.set_item('WLT_x0020_Legal_x0020_Entity', WLTLegalEntity);
                listItem.set_item('Customer_x0020_Legal_x0020_Entit', CustomerLegalEntity);
                listItem.set_item('Contract_x0020_Signed', ContractSigned);
                listItem.set_item('Opportunity_x0020_No', OpportunityNo);
                listItem.set_item('Contract_x0020_Type', ContractType);
                listItem.set_item('Code_x0020_of_x0020_Conduct_x002', CodeofConductAgreed);
                listItem.set_item('Comments', SummaryComments);
                listItem.set_item('Intitial_x0020_Term_x0020__x0028', IntitialTerm);
                listItem.set_item('Notice_x0020_Period_x0020__x0028', NoticePeriod);
                listItem.set_item('Original_x0020_Operations_x0020_', OriginalOperationsCommenced);
                listItem.set_item('Extension_x0020_Term_x0020__x002', ExtensionTerm);
                listItem.set_item('Max_x0020_Number_x0020_of_x0020_', MaxNumberofExtensions);
                listItem.set_item('Comments_x0020__x002f__x0020_Not', DetailComments);
                listItem.set_item('Start_x0020_Date', StartDate);
                listItem.set_item('Last_x0020_notice_x0020_date', LastNoticeDate);
                listItem.set_item('Next_x0020_End_x0020__x002f__x00', NextEndBreakDate);
                listItem.set_item('Other_x0020_Contacts_x0020__x002', SummaryOtherContactsEmail1);
                listItem.set_item('Other_x0020_Contacts_x0020__x0020', SummaryOtherContactsEmail2);
                listItem.set_item('Other_x0020_Contacts_x0020__x0021', SummaryOtherContactsEmail3);
                listItem.set_item('Other_x0020_Contacts_x0020__x0022', SummaryOtherContactsEmail4);
                listItem.set_item('Country', Country);
                listItem.set_item('Additional_x0020_Locations', AdditionalLocations);
                listItem.set_item('Invoicing_x0020_Currency', InvoicingCurrency);
                listItem.set_item('Invoice_x0020_Frequency', InvoiceFrequency);
                listItem.set_item('Late_x0020_Payment_x0020_Interes', LatePaymentInterest);
                listItem.set_item('Local_x0020_Currency', LocalCurrency);
                listItem.set_item('Charging_x0020_Mechanism', ChargingMechanism);
                listItem.set_item('Contractual_x0020_Payment_x0020_', ContractualPaymentTerms);
                listItem.set_item('Expected_x0020_Revenue_x0020__x0', ExpectedRevenue);
                listItem.set_item('Inflation_x0020_Price_x0020_Char', InflationPriceChargeRecovery);
                listItem.set_item('Expected_x0020_Profit_x0020__x00', ExpectedProfit);
                listItem.set_item('General_x0020_Direct_x0020_Losse', GeneralDirectLosses);
                listItem.set_item('Product_x0020__x002f__x0020_Stoc', ProductStockOwner);
                listItem.set_item('Insurance_x0020_Requirements', InsuranceRequirements);
                listItem.set_item('Product_x0020__x002f__x0020_Stoc0', ProductStockDirectLosses);
                listItem.set_item('Indirect_x002f_Consequential_x00', IndirectConsequentialDamages);
                listItem.set_item('Indemnification', Indemnification);
                listItem.set_item('Service_x0020_Lines',  JSON.stringify(ServiceLines));
                listItem.set_item('KPI_x0020__x002f__x0020_SLA_x002', KPISLAFailurePenalty);
                listItem.set_item('Obligations',  JSON.stringify(Obligations));
                listItem.set_item('WLT_x0020__x002f__x0020_Client_x', WLTClientSoftware);
                listItem.set_item('Pre_x002d_employment_x0020_Scree', PreemploymentScreening);
                listItem.set_item('Redundancy_x0020_Recovery', RedundancyRecovery);
                listItem.set_item('Recruitement_x0020_Fee', RecruitementFee);
                listItem.set_item('Transferring_x0020_In_x0020_Empl', TransferringInEmployeeIndemnity);
                listItem.set_item('Transferring_x0020_Out_x0020_Emp', TransferringOutEmployeeIndemnity);
                listItem.set_item('Termination_x0020_Notification', TerminationNotification);
                listItem.set_item('Termination_x0020_Rights', TerminationRights);
                listItem.set_item('Termination_x0020_Provisions', JSON.stringify(TerminationProvisions));
                listItem.set_item('Termination_x0020_Penalties', TerminationPenalties);

                listItem.set_item('WLT_x0020_Exclusivity', WLTExclusivity);
                listItem.set_item('Master_x0020_Contract_x0020__x00', MasterContractOther);
                listItem.set_item('After_x0020_end_x0020_date_x002c', Afterenddateextensionallowed);

                listItem.set_item('WLT_x0020_late_x0020_payment_x00', WLTlatepaymentcharge);
                listItem.set_item('Revenue_x0020__x0028_local_x0020', Revenue);
                listItem.set_item('Gross_x0020_Profit_x0020__x0028_', GrossProfit);
                listItem.set_item('Primary_x0020_Site_x0020__x002f_', PrimarySiteFacility);

                //People picker fields
                listItem.set_item('Account_x0020_Manager', amUser);
                listItem.set_item('Finance_x0020_Manager', fmUser);
                listItem.set_item('Contract_x0020__x002f__x0020_Sit', csmUser);
                listItem.set_item('Legal_x0020_Services_x0020_Conta', lscUser);

                listItem.set_item('AccountManagerText', amuserDisplayName);
                listItem.set_item('FinanceManagerText', fmuserDisplayName);
                listItem.set_item('ContractSiteManagerText', csmuserDisplayName);
                listItem.set_item('LegalServicesContactText', lscuserDisplayName);

                listItem.update();


                //Break list item permission
                listItem.resetRoleInheritance();
                listItem.breakRoleInheritance(false);
                var collRoleDefinitionBinding = SP.RoleDefinitionBindingCollection.newObject(clientContext);
                collRoleDefinitionBinding.add(clientContext.get_web().get_roleDefinitions().getByType(SP.RoleType.contributor));
                var adminGroup = oWeb.get_siteGroups().getByName("WLT CDB Administrator");
                if (Region == "WLT APAC") {
                    var approverGroup = oWeb.get_siteGroups().getByName("WLT APAC CDB");
                }
                else if (Region == "WLT EMEA") {
                    var approverGroup = oWeb.get_siteGroups().getByName("WLT EMEA CDB");
                }
                else if (Region == "WLT India") {
                    var approverGroup = oWeb.get_siteGroups().getByName("WLT India CDB");
                }
                else if (Region == "WLT Global") {
                    var approverGroup = oWeb.get_siteGroups().getByName("WLT Global CDB");
                }
                listItem.get_roleAssignments().add(adminGroup, collRoleDefinitionBinding);
                listItem.get_roleAssignments().add(approverGroup, collRoleDefinitionBinding);

                listItem.get_roleAssignments().add(amUser, collRoleDefinitionBinding);
                listItem.get_roleAssignments().add(fmUser, collRoleDefinitionBinding);
                listItem.get_roleAssignments().add(csmUser, collRoleDefinitionBinding);
                listItem.get_roleAssignments().add(lscUser, collRoleDefinitionBinding);

                clientContext.executeQueryAsync(onSuccess, onFailure);

                function onSuccess() {
                    //alert('All changes updated successfully!');
                    //window.location.replace("http://czchowsint1385/sites/clarity/WLTCDB/SitePages/Home.aspx");
                    $("#dialog").dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                            "OK": function () {
                                window.location.replace("../SitePages/Home.aspx");
                            }
                        }
                    });

                }
                function onFailure(sender, args) {
                    //nsole.log(args.get_message());
                    alert('Failed: ' + args.get_message());
                }
                
            }
            function onUsersFail(sender, args) {
                alert('Users Request failed.' + args.get_message() + '\n' + args.get_stackTrace());
            }

        }
    });
    $("#btnCancel").on('click', function () {
        window.location.replace("../SitePages/Home.aspx");
    });
});
function isPageValid() {
    var isvalid = true;
    //Client & Scope Section
    if ($("#ddlCustomer").val() == null || $("#txtContractRef").val() == '' || $("#ddlRegion").val() == null || $("#ddlSector").val() == null || $("#ddlWLTLegalEntity").val() == null || $("#ddlContractSigned").val() == null || $("#ddlWLTExclusivity").val() == null || $("#ddlCodeofConductAgreed").val() == null || $("#ddlMasterContractOther").val() == null) {
        $("li[aria-controls*='tabSummary']").find('a').trigger('click');
        $("#ui-id-1").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
        $("#ui-id-2").css("display", "block");
        isvalid = false;
    } else {
        $("#ui-id-1").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
        $("#ui-id-2").css("display", "none");
    }
    //Term Section

    if ($("#ddlContractType").val() == null || $("#ddlOriginalOperationsCommenced").val() == null || $("#dtpStartDate").val() == '' || $("#txtIntitialTerm").val() == '' || $("#txtNoticePeriod").val() == '' || $("#dtpNextEndBreakDate").val() == '' || $("#ddlAfterenddateextensionallowed").val() == null || $("#ddlMaxNumberofExtensions").val() == null || $("#dtpLastNoticeDate").val() == '') {
        $("li[aria-controls*='tabSummary']").find('a').trigger('click');
        $("#ui-id-3").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
        $("#ui-id-4").css("display", "block");
        isvalid = false;
    } else {
        $("#ui-id-3").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
        $("#ui-id-4").css("display", "none");
    }

    //Location & Key Contacts

    if ($("#ddlCountry").val() == null) {
        $("li[aria-controls*='tabSummary']").find('a').trigger('click');
        $("#ui-id-5").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
        $("#ui-id-6").css("display", "block");
        isvalid = false;
    } else {
        $("#ui-id-5").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
        $("#ui-id-6").css("display", "none");
    }

    var pplAccountManagerValidation = SPClientPeoplePicker.SPClientPeoplePickerDict.pplAccountManager_TopSpan.HasResolvedUsers();
    var pplFinanceManagerValidation = SPClientPeoplePicker.SPClientPeoplePickerDict.pplFinanceManager_TopSpan.HasResolvedUsers();
    var pplLegalServicesContactValidation = SPClientPeoplePicker.SPClientPeoplePickerDict.pplLegalServicesContact_TopSpan.HasResolvedUsers();
    var pplContractSiteManagerValidation = SPClientPeoplePicker.SPClientPeoplePickerDict.pplContractSiteManager_TopSpan.HasResolvedUsers();

    if (pplAccountManagerValidation == false || pplContractSiteManagerValidation == false || pplFinanceManagerValidation == false || pplLegalServicesContactValidation == false) {
        $("li[aria-controls*='tabSummary']").find('a').trigger('click');
        $("#ui-id-5").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
        $("#ui-id-6").css("display", "block");
        $("#errorPeoplePicker").show();
        isvalid = false;
    }
    else {
        $("#ui-id-5").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
        $("#ui-id-6").css("display", "none");
        $("#errorPeoplePicker").hide();
    }


    //Detail Tab
    //Invoicing
    if (isvalid) {
        if ($("#ddlLocalCurrency").val() == null || $("#ddlInvoicingCurrency").val() == null || $("#ddlChargingMechanism").val() == null || $("#ddlInvoiceFrequency").val() == null || $("#ddlWLTlatepaymentcharge	").val() == null || $("#ddlLatePaymentInterest").val() == null) {
            $("li[aria-controls*='tabDetail']").find('a').trigger('click');
            $("#ui-id-9").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
            $("#ui-id-10").css("display", "block");
            isvalid = false;
        } else {
            $("#ui-id-9").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
            $("#ui-id-10").css("display", "none");
        }

        //Commercial,Revenue & Profit

        if ($("#ddlInflationPriceChargeRecovery").val() == null) {
            $("li[aria-controls*='tabDetail']").find('a').trigger('click');
            $("#ui-id-13").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
            $("#ui-id-14").css("display", "block");
            isvalid = false;
        } else {
            $("#ui-id-13").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
            $("#ui-id-14").css("display", "none");
        }


        //Service
        if ($("#ddlKPISLAFailurePenalty").val() == null || $("#ddlServiceLines").val() == null) {
            $("li[aria-controls*='tabDetail']").find('a').trigger('click');
            $("#ui-id-17").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
            $("#ui-id-18").css("display", "block");
            isvalid = false;
        } else {
            $("#ui-id-17").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
            $("#ui-id-18").css("display", "none");
        }

        //Employee
        if ($("#ddlPreemploymentScreening").val() == null) {
            $("li[aria-controls*='tabDetail']").find('a').trigger('click');
            $("#ui-id-19").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-active ui-state-active');
            $("#ui-id-20").css("display", "block");
            isvalid = false;
        } else {
            $("#ui-id-19").addClass('ui-accordion-header ui-corner-top ui-state-default ui-accordion-icons ui-accordion-header-collapsed ui-corner-all');
            $("#ui-id-20").css("display", "none");
        }
    }


    return isvalid
}
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
function deleteItem(id) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items(" + id + ")",
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        },
        success: function (data) {
            $("#" + id + "").remove();
            console.log(id + " file removed");
        },
        error: function (data) {
            alert(data.responseJSON.error);
        }
    });
}
function dateFormatter(param) {
    var date = new Date(param);
    var month = date.getMonth();
    var newDate = date.getDate() + "-" + months[month] + "-" + date.getFullYear();
    return newDate;
}
function loadAttachments() {
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        var ctx = new SP.ClientContext.get_current();
        var oWeb = ctx.get_web();
        var oList = oWeb.get_lists().getByTitle('CDBDocs');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='UniqueId0'/><Value Type='Text'>" + inputID + "</Value></Eq></Where></Query><RowLimit>100</RowLimit></View>");
        var oListItemCollection = oList.getItems(camlQuery);
        ctx.load(oListItemCollection, 'Include(LinkFilename,Id,File_x0020_Name,FileComments,FileVersion,Date_x0020_Effective,FileType,EncodedAbsUrl)');
        ctx.executeQueryAsync(function onFileSuccess() {
            var enumerator = oListItemCollection.getEnumerator();
            while (enumerator.moveNext()) {
                var fileItem = enumerator.get_current();
                var newType = fileItem.get_item('FileType') == null ? '' : fileItem.get_item('FileType');
                var newDateEffective = fileItem.get_item('Date_x0020_Effective') == null ? '' : dateFormatter(fileItem.get_item('Date_x0020_Effective'));
                var deleteVar = "deleteItem";
                $("#fileList").append("<tr id='" + fileItem.get_id() + "'><td><a href='" + fileItem.get_item('EncodedAbsUrl') + "'>" + fileItem.get_item('LinkFilename') + "</td><td>" + fileItem.get_item('File_x0020_Name') + "</td><td>" + newType + "</td><td>" + newDateEffective + "</td><td>" + fileItem.get_item('FileVersion') + "</td><td>" + fileItem.get_item('FileComments') + "</td><td><img src='../SiteAssets/Images/remove.jpg' style='height:25px;width:25px;cursor:pointer;' onclick='" + deleteVar + "(" + fileItem.get_id() + ")" + "' /></td></tr>");
            }

        }, function onFileFailure(sender, args) {
            alert('Failed: ' + args.get_stackTrace());
        });
    }, 'SP.js');
}
