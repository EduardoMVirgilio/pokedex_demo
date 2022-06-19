// Assets images path for the application
// https://raw.githubusercontent.com/PokeAPI/sprites/068d04e360891931c8be1533a944fa28b9bae0b2/sprites/pokemon/other/dream-world/649.svg
// Api url for the application
// https://pokeapi.co/api/v2/pokemon/649

const slider = document.querySelector('#pokeId');
const sliderValue = document.querySelector('#indicator');
sliderValue.innerHTML = slider.value;
slider.oninput = function() {
    sliderValue.innerHTML = this.value;
}
const form = document.querySelector('#pokeForm');

form.onsubmit = async function(e) {
    e.preventDefault();
    const pokeId = document.querySelector('#pokeId').value;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        const pokeName = data.name;
        const pokeImg = `https://raw.githubusercontent.com/PokeAPI/sprites/068d04e360891931c8be1533a944fa28b9bae0b2/sprites/pokemon/other/dream-world/${pokeId}.svg`;
        const image = new Image();
        image.src = pokeImg;
        image.crossOrigin = "Anonymous";
        image.onload = () =>{
            const colorThief = new ColorThief();
            const pokePalette = colorThief.getPalette(image, 6);
            const pokeColorsHex = pokePalette.map(color => {
                const hex = color.map(c => c.toString(16).padStart(2, '0')).join('');
                return `#${hex}`;
            });
            document.querySelector('#pokeImg').src = pokeImg;
            document.querySelector('#pokeName').innerHTML = pokeName;
            document.querySelector('#pokeColors').innerHTML = null
            pokeColorsHex.forEach(color => {
                const colorItem = document.createElement('li');
                colorItem.classList.add('result__color');
                colorItem.style.backgroundColor = color;
                document.querySelector('#pokeColors').appendChild(colorItem);
            });
        }

    } catch (error) {
        console.error(error);
    }
}
