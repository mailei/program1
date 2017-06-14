$("#clickButton").click(function(){
    $.post("/weather", function(data, status){
        $('#pageTitle').html(data.name);
    });
});