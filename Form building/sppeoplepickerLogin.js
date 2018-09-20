(function ($) {

    RegisterScriptFiles('clienttemplates.js');
    RegisterScriptFiles('clientforms.js');
    RegisterScriptFiles('clientpeoplepicker.js');
    RegisterScriptFiles('autofill.js');
var usersAC=null;
var usersFM=null;
var usersCSM=null;
var usersLSC=null;
    function RegisterScriptFiles(filename) {
        var scriptEle = document.createElement('script');
        scriptEle.setAttribute("type", "text/javascript")
        scriptEle.setAttribute("src", "/_layouts/15/" + filename);
        document.getElementsByTagName("head")[0].appendChild(scriptEle)

    }
    // Render and initialize the client-side People Picker.
    function initializePeoplePicker(eleId) {
        // Create a schema to store picker properties, and set the properties.
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '280px';
        // Render and initialize the picker. 
        // Pass the ID of the DOM element that contains the picker, an array of initial
        // PickerEntity objects to set the picker value, and a schema that defines
        // picker properties.
        if(usersAC!=null ||usersFM!=null || usersCSM!=null||usersLSC!=null){
        if (eleId == "pplFinanceManager" && usersFM!=null && usersFM!="undefined") {
            var users = new Array(1);
            var defaultUser = new Object();
            defaultUser.AutoFillDisplayText = usersFM.Title;
            defaultUser.AutoFillKey = usersFM.LoginName;
            defaultUser.Description = usersFM.Email;
            defaultUser.DisplayText = usersFM.Title;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Key = usersFM.LoginName;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
            this.SPClientPeoplePicker.ShowUserPresence = false;
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, users, schema);
        } else if(eleId == "pplAccountManager" && usersAC!=null && usersAC!="undefined") {
            var users = new Array(1);
            var defaultUser = new Object();
            defaultUser.AutoFillDisplayText = usersAC.Title;
            defaultUser.AutoFillKey = usersAC.LoginName;
            defaultUser.Description = usersAC.Email;
            defaultUser.DisplayText = usersAC.Title;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Key = usersAC.LoginName;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
            this.SPClientPeoplePicker.ShowUserPresence = false;
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, users, schema);
        }
        else if(eleId == "pplContractSiteManager" && usersCSM!=null && usersCSM!="undefined") {
            var users = new Array(1);
            var defaultUser = new Object();
            defaultUser.AutoFillDisplayText = usersCSM.Title;
            defaultUser.AutoFillKey = usersCSM.LoginName;
            defaultUser.Description = usersCSM.Email;
            defaultUser.DisplayText = usersCSM.Title;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Key = usersCSM.LoginName;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
            this.SPClientPeoplePicker.ShowUserPresence = false;
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, users, schema);
        }
        else if(eleId == "pplLegalServicesContact" && usersLSC!=null && usersLSC!="undefined") {
            var users = new Array(1);
            var defaultUser = new Object();
            defaultUser.AutoFillDisplayText = usersLSC.Title;
            defaultUser.AutoFillKey = usersLSC.LoginName;
            defaultUser.Description = usersLSC.Email;
            defaultUser.DisplayText = usersLSC.Title;
            defaultUser.EntityType = "User";
            defaultUser.IsResolved = true;
            defaultUser.Key = usersLSC.LoginName;
            defaultUser.Resolved = true;
            users[0] = defaultUser;
            this.SPClientPeoplePicker.ShowUserPresence = false;
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, users, schema);
        }}else{
            var schema = {};
            schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
            schema['SearchPrincipalSource'] = 15;
            schema['ResolvePrincipalSource'] = 15;
            schema['AllowMultipleValues'] = true;
            schema['MaximumEntitySuggestions'] = 50;
            schema['Width'] = '280px';
            this.SPClientPeoplePicker.ShowUserPresence = false;
            this.SPClientPeoplePicker_InitStandaloneControlWrapper(eleId, null, schema);
        }
    }

    function GetPeoplePickerValues(eleId) {
        var toSpanKey = eleId + "_TopSpan";
        var peoplePicker = null;

        // Get the people picker object from the page.
        //var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
        var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
        // Get the people picker object from the page.
        for (var propertyName in ClientPickerDict) {
            if (propertyName == toSpanKey) {
                peoplePicker = ClientPickerDict[propertyName];
                break;
            }
        }
        if (peoplePicker != null) {
            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                 userInfo += user['Key'] + ";#";
            }
            return userInfo;
        }
        else
            return '';
    }
	function GetPeoplePickerValuesDisplayText(eleId) {
        var toSpanKey = eleId + "_TopSpan";
        var peoplePicker = null;

        // Get the people picker object from the page.
        //var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
        var ClientPickerDict = this.SPClientPeoplePicker.SPClientPeoplePickerDict;
        // Get the people picker object from the page.
        for (var propertyName in ClientPickerDict) {
            if (propertyName == toSpanKey) {
                peoplePicker = ClientPickerDict[propertyName];
                break;
            }
        }
        if (peoplePicker != null) {
            // Get information about all users.
            var users = peoplePicker.GetAllUserInfo();
            var userInfo = '';
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                userInfo += user['DisplayText'] + ";#";
            }
            return userInfo;
        }
        else
            return '';
    }

    $.fn.spPeoplePicker = function (userobj) {
        var eleId = $(this).attr('id');
        if(eleId=="pplAccountManager"){ usersAC=userobj}
        if(eleId=="pplFinanceManager"){ usersFM=userobj}
        if(eleId=="pplContractSiteManager"){ usersCSM=userobj}
        if(eleId=="pplLegalServicesContact"){ usersLSC=userobj}
        
        ExecuteOrDelayUntilScriptLoaded(function () { initializePeoplePicker(eleId); }, 'sp.core.js');
    };

    // Query the picker for user information.
    $.fn.getUserLoginName = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerValues(eleId);
        return spUsersInfo.slice(0, -2);
    }
	
	  // Query the picker for user information.
    $.fn.getUserDisplayName = function () {
        var eleId = $(this).attr('id');
        var spUsersInfo = GetPeoplePickerValuesDisplayText(eleId);
        return spUsersInfo.slice(0, -2);
    }

  
})(jQuery);
