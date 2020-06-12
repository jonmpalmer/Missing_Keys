function updateOrder(orderID){
    $.ajax({
        url: '/orders/' + orderID,
        type: 'PUT',
        data: $('#update-order').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
