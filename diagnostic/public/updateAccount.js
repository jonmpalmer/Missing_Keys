function updateAccount(id){
    $.ajax({
        url: '/accounts/' + id,
        type: 'PUT',
        data: $('#update-account').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
