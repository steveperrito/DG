$(function() {

    if (Modernizr.geolocation) {
        navigator.geolocation.getCurrentPosition(success);

        function success(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            setUI(lat, long);
        }
    } else {
        setUI(43.7015702, -116.51070259999999 );
    }

    $.get('http://www.telize.com/geoip', function(data){
        setUI(data.latitude, data.longitude);
    });

    function setUI(lat, lng) {
        var myLatlng = new google.maps.LatLng(lat,lng);

        var mapOptions = {
            center: myLatlng,
            zoom: 10,
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        };

        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        map.data.setStyle({visible: false});

        google.maps.event.addListener(map, 'click', function(e) {
            createInfoWindowContent(e.latLng.k, e.latLng.B);
            map.setCenter(e.latLng);
            map.setZoom(17);
        });

        function createInfoWindowContent(lat, lng) {
            var dgImgDiv = $('#dg-img-div');
            var imgURL = 'http://dev1.tomnod.com/chip_api/chip/';
            imgURL += 'lat/' + lat + '/lng/' + lng;
            var imgTag = '<img id="the-dg-img" src="' + imgURL + '" width="400" />';
            var loadGif = $('.load-gif:eq(0)').clone();
            var dgImg = $('<div/>');

            dgImgDiv.empty();
            dgImg.addClass('dg-img');
            dgImg.append(imgTag);
            loadGif.css({
                'margin-top': '150px',
                'margin-left': '150px'
            })
            dgImgDiv.append(loadGif);
            dgImgDiv.append(dgImg);

            $('#the-dg-img').load(function(){
                loadGif.fadeOut(function() {
                    dgImg.fadeIn();
                    $('.zoom-btn').css({
                        'visibility': 'visible'
                    })
                });
            })


        }

        $('.zoom-btn').click(function(){
            $(this).css({
                'visibility': 'hidden'
            });
            map.setZoom(10);
        })
    }
});
