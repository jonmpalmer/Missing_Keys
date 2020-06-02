function updateSupplier(id){
    $.ajax({
        url: '/suppliers/' + id,
        type: 'PUT',
        data: $('#update-supplier').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
