function updateProduct(productID){
    $.ajax({
        url: '/products/' + productID,
        type: 'PUT',
        data: $('#update-product').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
