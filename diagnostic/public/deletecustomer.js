function deleteAccount(id){
    $.ajax({
        url: '/accounts/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
