document.getElementById('searchBtn').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemonInfo');

    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                const pokemonImage = data.sprites.front_default;
                const pokemonName = data.name[0].toUpperCase() + data.name.slice(1);
                const pokemonType = data.types.map(typeInfo => typeInfo.type.name).join(', ');
                const pokemonHeight = data.height / 10;
                const pokemonWeight = data.weight / 10;
                const pokemonAbilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
                const pokemonBaseExperience = data.base_experience;
                const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

                pokemonInfoDiv.innerHTML = `
                    <img src="${pokemonImage}" alt="${pokemonName}">
                    <h2>${pokemonName} (#${data.id})</h2>
                    <p><strong>Tipos:</strong> ${pokemonType}</p>
                    <p><strong>Altura:</strong> ${pokemonHeight} m</p>
                    <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
                    <p><strong>Habilidades:</strong> ${pokemonAbilities}</p>
                    <p><strong>Experiencia base:</strong> ${pokemonBaseExperience}</p>
                    <p><strong>Estadísticas:</strong> ${pokemonStats}</p>
                `;
            })
            .catch(error => {
                pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        pokemonInfoDiv.innerHTML = `<p>Por favor, escribe el nombre o número del Pokemon.</p>`;
    }
});
