({
	getAccountRecords : function(component,event,helper,FilterAccount,sortedBy,sortDirection) {
		var action = component.get('c.getAccounts');
        action.setParams({
            "FilterAccount" : FilterAccount,
            "SortBy" : sortedBy,
            "SortDirection" : sortDirection
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state == 'SUCCESS') {
                var data = response.getReturnValue();
                for(var i= 0; i < data.length; i++){
                    data[i].OwnerName = data[i].Owner.Name;
                    data[i].AccountURL = '/'+ data[i].Id;
                }
                component.set('v.data', data);
            }
        });
        $A.enqueueAction(action);
	},
})
