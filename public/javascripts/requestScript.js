(function ($) {
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
        createWeatherList(rssData);
        sickAction();
    }

    function createWeatherList(rssData) {
        var defer = $.Deferred();
        (function () {
            $("#slider").remove();
            var weekWeather = [];
            var ulTab = $("<ul>").attr('id', 'slider');
            $("#slickList").append(ulTab);
            // _.each(rssData, function (value, key, rssData) {
            //     var appendTag = $("<div>")
            //         .addClass('weatherList')
            //         .append('<font size="50px" color="black">' + value.title + '</font>');
            //     $("#slider").append(appendTag);
            // });
            for(var keyNumber=0;keyNumber<Object.keys(rssData).length;keyNumber++){
                var weather=rssData[keyNumber].title;
                var appendTag = $("<div>")
                    .addClass('weatherList')
                    .append('<font size="50px" color="black">' + weather + '</font>');
                $("#slider").append(appendTag);
            }
            defer.resolve();
        })();
        return defer.promise();
    }
    function sickAction() {
        $('#slider').slick({
            autoplay: true,      // 自動で切り替える
            autoplaySpeed: 3000, // 待機する時間
            arrows: false,       // 次へ・戻るボタンを非表示
            dots: true           // 点のペジャーナビゲーション
        });
    }
})(jQuery);