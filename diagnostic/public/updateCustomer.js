function updateCustomer(customer.customerID){
    $.ajax({
        url: '/customers/' + customer.customerID,
        type: 'PUT',
        data: $('#update-customer').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
