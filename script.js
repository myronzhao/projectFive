//API'S THAT INTEREST ME
// clash royale https://github.com/martincarrera/clash-royale-api
// 	list cards with description and elixir cost, user selects an 8-card deck, display average elixir cost for deck
	
// marvel http://developer.marvel.com/
// 	displays which superhero you are based on user input of physical attributes
// 	displays the comic books that were released on your birthday
// 	example http://ellypham.com/
// 			http://elisevanstaevel.com/work/ultimate-75th/
// 			http://blog.pixelastic.com/2016/06/01/marvel-super-search/
			
// comic vine http://comicvine.gamespot.com/api
// 	user input birthday, show superhero born that day
// 	user inputs superpowers, show superheroes with those powers

var clashApp = {};

// Get card information from API
clashApp.getCard = function() {
	$.ajax({
		url: 'http://www.clashapi.xyz/api/cards',
		method: 'GET',
		dataType: 'json'
	}).then(function(cardData) {
		clashApp.displayCard(cardData);
		// clashApp.buildDeck(cardData);
	});
};

// Displays card information
clashApp.displayCard = function(card) {
	i = 0;
	// console.log(card);
	var cardHtml = $('#cardTemplate').html();
	var cardTemplate = Handlebars.compile(cardHtml);

	card.forEach(cardObject => {
		// console.log(cardObject);
		var renderedCard = cardTemplate(cardObject);
		
		// Creates a container to hold all elements for each card
		var $cardContainer = $('<article>').attr('class', `card ${card[i].idName}`);

		// Creates an image tag, gets image link using the API's idName, and displays image
		// adding a class to each img tag to make them unique
		var $cardImage = $('<img>').attr({
			class: `image ${card[i].idName}`,
			src: `http://www.clashapi.xyz/images/cards/${card[i++].idName}.png`
		});

		// Putting 'card' container into the 'cards' class, then putting the image and description into the 'card' container
		$('.cards').append($cardContainer.append($cardImage));


		$('.infoBox').append(renderedCard);
		$('.cardInfo').hide();
	});

	// On hover of the image, display the card info for each card
	for (let x = 0; x < 60; x++) {
		let name = card[x].idName;
		let cost = card[x].elixirCost;
		var sum = 0;
		var d = 0;
		$(`.image.${name}`).on('mouseenter', function() {
			// console.log($(`.cardInfo.${name}`))
			$(`.cardInfo.${name}`).show();
		}).on('mouseleave', function() {
			$(`.cardInfo.${name}`).hide();
		}).on('click', function() {
			d++
			if (d <= 8) {
				$('.deck').append($('<img>').attr('src', `http://www.clashapi.xyz/images/cards/${name}.png`));
				console.log('elixir cost:', cost);
				sum = sum + cost;
				$('.elixirAvg').text("Average Elixir Cost: " + (sum/d).toFixed(2));
				console.log(d);
				console.log(sum);
			} else if (d > 8) {
				$('.elixirAvg').text("Average Elixir Cost: " + (sum/8).toFixed(2));
				// $('.results').append($(<button>).text('Reset'));
			}

		});
	// console.log(x, name);
	}

};


// When user clicks a card, add card to the empty card field, and calculates average elixir cost
// clashApp.buildDeck = function(build) {
// 	for (x = 0; x < 60; x++) {
// 		let name = build[x].idName;
// 		$(`.image.${name}`).on('click', function() {
// 			var $selectedImage = $('<img>').attr('src', `http://www.clashapi.xyz/images/cards/${build[x].idName}.png`);
// 			$('.deck').append($selectedImage);
// 		});
// 	}
// };



clashApp.init = function() {
	// When the page loads, go get the card data from API
	clashApp.getCard();
	// clashApp.buildDeck();
};

// When the page loads, start the app
$(function() {
	clashApp.init();
});