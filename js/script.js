let employees = {};
let overlayHTML;
let frame = document.getElementsByClassName('frame');



$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us',
	dataType: 'json',
	success: function (data) {
		// first populate our variable with the received data
		employees = data.results;

		// then call the functions that work on that data
		displayEmployer();
		registerEventListeners();
		closeModal ();
	}
});

// Overview employers
function displayEmployer(data) {
	let employerHTML = '<ul>';
	$.each(employees, function (i, item) {
		employerHTML += '<li class="frame" id="' + i + '">';
		employerHTML += '<img class="image float"  src="' + item.picture.large + '" alt="' + item.name.first + '">';
		employerHTML += '<div class="text-frame">';
		employerHTML += '<div class="name">' + item.name.first + ' ' + item.name.last + '</div>';
		employerHTML += '<div class="text">' + item.email + '</div>';
		employerHTML += '<div class="text">' + item.location.city + '</div>';
		employerHTML += '</div>';
		employerHTML += '</li>';
		$('#people').html(employerHTML);
	});
	employerHTML += '</ul>';
}

// modal box content
function displayOverlay(chosenOne) {
	let employeeData = employees[chosenOne];
	let overlayHTML =
		'<div class="overlay">\n' +
		'<div class="close-button"></div>\n' +
		'<img src="' + employeeData.picture.large + '" alt="' + employeeData.name.first + ' ' + employeeData.name.last + '" class="image">\n' +
		'<div class="name">' + employeeData.name.first + ' ' + employeeData.name.last + '</div>\n' +
		'<div class="text">' + employeeData.email + '</div>\n' +
		'<div class="text border">' + employeeData.location.city + '</div>\n' +
		'<div class="text">' + employeeData.phone + '</div>\n' +
		'<div class="text">' + employeeData.location.city + '</div>\n' +
		'<div class="text">' + new Date(employeeData.dob.date).toLocaleDateString('en-GB') + '</div>\n' +  
		'</div>';
	$('#modal-content').html(overlayHTML);
}

// register the event listeners to open the modal box
function registerEventListeners() {
	let peopleElement = document.getElementById('people');
	peopleElement.addEventListener('click', function (event) {
		let chosenOne = event.target.closest('.frame').getAttribute('id');
		displayOverlay(chosenOne);
	}, false)
}

//close modal box
function closeModal () {
	let close = document.getElementById('modal-content');
	close.addEventListener('click', function (event) {
		event.target.closest('.overlay').classList.add('hidden');
	})
}

