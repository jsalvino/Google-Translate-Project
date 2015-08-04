	var app = {};
	app.apiUrl = 'https://www.googleapis.com/language/translate/v2';
	app.apiKey = 'AIzaSyCHYkCwHAkXUtjqFs83Ubj2gIf0eaYboUI';
	app.speechKey = '55b79d42e8544d49859852e37a4968f7';
	app.speechUrl = 'https://api.voicerss.org/';
	

	app.getInfo = function(searchQuery) {
		$.ajax({
			url: app.apiUrl,
			format: 'json',
			type: 'GET',
			data: {
				key: app.apiKey,
				source: 'en',
				target: 'it',
				q : searchQuery
			},
			success: function(res) {
				app.displayInfo(res.data.translations);
			} //end success
		}); // end ajax
	};  // end .getInfo function

	app.displayInfo = function(data) {
		var translation = data['0']['translatedText'];
		var newTranslation = translation.replace(/&#39;/g, "'");
		$('.text').addClass('animated fadeIn').text(newTranslation);
		app.speak(newTranslation);
	}; //end .displayInfo function

	app.searchPhotos = function() {
		$('header form').on('submit', function(evnt) {
			evnt.preventDefault();  //to stop page from refreshing page upon submit
			$('.credits').addClass('animated fadeOut');
			var searchQuery = $('.query').val();
			app.getInfo(searchQuery);
		}); //end submit function
	}; // end .searchPhotos function

	app.speak = function(phrase) {
			var fullUrl = app.speechUrl + "/?key=" + app.speechKey + "&hl=it-it&r=0&f=16khz_16bit_mono&src=" + phrase; 
			$('audio').attr('src', fullUrl);
	};  //end speak function

app.init = function() {
	app.getInfo();
	app.searchPhotos();
}; //end init function

$(document).ready(function(){
  app.init();
});  // end ready function
