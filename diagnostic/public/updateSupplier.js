function updateSupplier(supplierID){
    $.ajax({
        url: '/suppliers/' + supplierID,
        type: 'PUT',
        data: $('#update-supplier').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
