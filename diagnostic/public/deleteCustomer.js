function deleteCustomer(customerID){
    $.ajax({
        url: '/customers/' + customerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
