$("#clickButton").click(function(){
    $.post("/", function(data, status){
        $('#pageTitle').html(data.name);
    });
});