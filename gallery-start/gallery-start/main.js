const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const images = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', ];

/* Looping through images */
	for (const image of images) {
		const newImage = document.createElement('img');
		newImage.setAttribute('src', './images/' + image);
		newImage.addEventListener('click', (e) => displayedImage.src = e.target.src);
		thumbBar.appendChild(newImage);
	}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', toggleBtn);
function toggleBtn() {
	const btnClass = btn.getAttribute('class');
	if (btnClass === 'dark') {
		btn.setAttribute('class', 'light');
		btn.textContent = 'Lighten';
		btn.style.backgroundColor = "rgba(0,0,0,0.5)";
	} else {
		btn.setAttribute('class', 'dark');
		btn.textContent = 'Darken';
		btn.style.backgroundColor = "rgba(150,150,150,0.6)";
	}
}