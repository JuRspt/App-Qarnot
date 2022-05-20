$('.alert').hide();

const pokemonItem = ({id, avatar, name, type}) => `
    <tr>
        <th scope="id">${id}</th>
        <td class="avatar"><img src="${avatar}"/></td>
        <td class="name">${name}</td>
        <td class="type">${type}</td>
    </tr>
    `; 

function get20 () {
    for (let i = 1; i <= 20; i++){
    if (i == 1)
    {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
        .then(function (response) {
            // handle success
            //console.log(response);
            // $ and .html from jquery
            $('#pokemon tbody').html([response.data].map(pokemonItem).join(''));            
        })
        .catch(function (error) {
            // handle error    
            //console.log(error);
            $('.alert').html(error.message);
            $('.alert').show();
        })
    }
    else
    {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + i)
        .then(function (response) {
            // handle success
            //console.log(response);
            // $ and .html from jquery
            $('#pokemon tbody').append([response.data].map(pokemonItem).join(''));
        })
        .catch(function (error) {
            // handle error    
            //console.log(error);
            $('.alert').html(error.message);
            $('.alert').show();
        })
    }
}
}
// not working
function sort_name()
{
        let tables, rows, sorting, c, a, b, tblsort;
        tables = document.getElementById("pokemon");
        sorting = true;
        while (sorting) {
            sorting = false;
            rows = tables.rows;
            for (c = 1; c < (rows.length - 1); c++) {
                tblsort = false;
                a = rows[c].getElementsByTagName("name")[0];
                b = rows[c + 1].getElementsByTagName("name")[0];
                if (a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase()) {
                   tblsort = true;
                   break;
                }
            }
        if (tblsort) {
            rows[c].parentNode.insertBefore(rows[c + 1], rows[c]);
            sorting = true;
        }
    }
}
get20();

$('#button_name').click(sort_name);