({
    init : function(component, event, helper) {
        component.set('v.columns', [
            { label: 'Name', fieldName: 'AccountURL', editable: true, sortable: true, type: 'url', typeAttributes: { label:{fieldName: 'Name'}, target: '_blank'} },
            { label: 'Owner Name', fieldName: 'OwnerName', sortable: true  },
            { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
            {label: 'Website', editable: true, fieldName: 'Website', type: 'url', typeAttributes: { label:{fieldName: 'Website'},target: '_blank'}},
            { label: 'Annual Revenue', editable: true, fieldName: 'AnnualRevenue', type: 'currency' }   
        ]);
        helper.getAccountRecords(component,event,helper,'','','');
    },
    handleData : function(component, event, helper) {
        var filterVal = component.get("v.FilterAccount");
        var sortDirection = component.get("v.sortDirection");
        var sortBy = component.get("v.sortedBy");
        helper.getAccountRecords(component,event,helper,filterVal,sortBy,sortDirection);
    },
    handleSort : function(component, event, helper) {
        var filterVal = component.get("v.FilterAccount");
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        var fieldName = '';
        if(sortedBy == 'AccountURL'){
            fieldName = 'Name';
        }
        else if(sortedBy == 'OwnerName'){
            fieldName = 'Owner.Name';
        }
        else{
            fieldName = sortedBy;
        }
        helper.getAccountRecords(component,event,helper,filterVal,fieldName,sortDirection);
        component.set('v.sortDirection', sortDirection);
        component.set('v.sortedBy', sortedBy);
    },
    handleSaveEdition: function (component, event, helper) {
        var draftValues = event.getParam('draftValues');
        var action = component.get('c.saveAccounts');
        action.setParams({
            "lstAccounts" : draftValues
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                component.set('v.draftValues', []);
                var filterVal = component.get("v.FilterAccount");
        var sortDirection = component.get("v.sortDirection");
        var sortBy = component.get("v.sortedBy");
        helper.getAccountRecords(component,event,helper,filterVal,sortBy,sortDirection);
            }
        });
        $A.enqueueAction(action);
    },
    
})
