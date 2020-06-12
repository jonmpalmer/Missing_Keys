function deleteSupplier(supplierID){
    $.ajax({
        url: '/suppliers/' + supplierID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
