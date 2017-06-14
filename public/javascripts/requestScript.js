$("#clickButton").click(function () {
    var cityName = $("#citySelector").val();
    var sendRequestBody = {
        'city': cityName
    }
    $.ajax({
        type: 'post',
        url: '/weather',
        data: JSON.stringify(sendRequestBody),
        contentType: 'application/JSON',
        dataType: 'JSON',
        scriptCharset: 'utf-8',
        success: function (data) {
            // Success
            console.log(data);
            putDisplay(data);
        },
        error: function (data) {

            // Error
            alert("request error");
            alert(JSON.stringify(data));
        }
    });
});

function putDisplay(rssData) {
    var d = new $.Deferred();
    createWeatherList(rssData, d);
    var myPromise = d.promise();
    myPromise.then(sickAction);
}

function createWeatherList(rssData, d) {
    $("#slider").remove();
    var weekWeather = [];
    $("#slickList").append('<ul class="slider" id="slider">');
    _.each(rssData, function (value, key, rssData) {
        var appendTag = $("<div class='weatherList'>")
            .append('<font size="50px" color="black">' + value.title + '</font>');
        $("#slider").append(appendTag);
    });
    d.resolve();
}
function sickAction() {
    console.log("sassa")
    $('#slider').slick({
    autoplay: true,      // 自動で切り替える
    autoplaySpeed: 2000, // 待機する時間
    arrows: false,       // 次へ・戻るボタンを非表示
    dots: true           // 点のペジャーナビゲーション
    });
}