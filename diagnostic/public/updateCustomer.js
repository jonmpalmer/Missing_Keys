function updateCustomer(customerID){
    $.ajax({
        url: '/customers/' + customerID,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
