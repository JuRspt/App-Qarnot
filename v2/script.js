const pokemonItem = ({ id, name, sprites, height, weight, base_experience }) => `
<tr id="pokemon${id}">
    <td>
        <p class="text-muted">${id}</p>
    </td>
    <td>
        <div class="d-flex align-items-center">
            <img src="${sprites.front_default}" alt=""
                style="width: 45px; height: 45px" class="rounded-circle">
            <div class="ms-3">
                <p class="fw-bold mb-1">${name}</p>
            </div>
        </div>
    </td>
    <td>
        <p class="fw-normal mb-1">
            Height: <strong>${height}</strong><br />
            Weight: <strong>${weight}</strong><br />
            XP: <strong>${base_experience}</strong><br />
        </p>
    </td>
    <td class="poke_types"></td>
    <td class="poke_abilities"></td>
</tr>
`;

const pokeTypeItem = ({ type }) => `
<span class="badge badge-success rounded-pill d-inline">${type.name}</span>
`;

const pokeAbilItem = ({ ability }) => `
<span class="badge badge-info rounded-pill d-inline">${ability.name}</span>
`;

function getPokemon(id) {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(function (response) {
            // handle success
            // console.log(response);
            $('#poketable tbody').append([response.data].map(pokemonItem).join(''));
            $('#poketable tbody #pokemon' + id + ' td.poke_types').html(response.data.types.map(pokeTypeItem).join(''));
            $('#poketable tbody #pokemon' + id + ' td.poke_abilities').html(response.data.abilities.map(pokeAbilItem).join(''));

            if (id > 42) {
                $('#poketable').DataTable();
            } else {
                getPokemon(id + 1);
            }
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
        })
        .then(function () {
            // always executed
        });
}

$(document).ready(function () {
    getPokemon(1);
});
