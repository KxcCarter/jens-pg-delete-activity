$(document).ready(handleReady);

function handleReady() {
    // Set up click listeners
    $('#submit').on('click', handleSubmit);

    // DELETE button event listener
    $('#jsShoeDisplay').on('click', '.js-item-ctrl', handleDeleteItem);

    // PUT / edit butten event listener
    $('#jsShoeDisplay').on('click', '.js-item-edit', handleEditItem);
    // $('#jsShoeDisplay').on('click', '.js-btn-confirm-edit', putEdit);

    // Get data
    getShoes();
}

function handleSubmit(event) {
    event.preventDefault();
    const name = $('#name').val();
    const size = $('#size').val();
    const cost = $('#cost').val();

    const objectToSend = {
        name: name,
        size: size,
        cost: cost,
    };

    $.ajax({
            method: 'POST',
            url: '/shoes',
            data: objectToSend,
        })
        .then(function(response) {
            //database is updated, need to update DOM
            getShoes();
        })
        .catch(function(err) {
            console.log(err);
            alert('Something went wrong in POST');
        });
}

function getShoes() {
    $.ajax({
            method: 'GET',
            url: '/shoes',
        })
        .then(function(response) {
            console.log('getShoes - response', response);

            //Append Shoes
            appendShoeTable(response);
        })
        .catch(function(error) {
            console.log('getShoes - error', error);
            alert('something went wrong in GET');
        });
}

function appendShoeTable(shoes) {
    //empty old data
    $('#jsShoeDisplay').empty();

    for (let shoe of shoes) {
        console.log(shoe);
        //make a row with info
        let tableRow = $(`
    <tr>
      <td>${shoe.name}</td>
      <td>$${shoe.cost} <span class="js-item-edit btn btn-sm btn-outline-warning" >edit</span></td>

      <td>${shoe.size}</td>
      <td class="js-item-ctrl btn btn-sm btn-outline-danger">X</td>
    </tr>
    `);
        // attach data to row, need for delete
        tableRow.data('id', shoe.id);

        //append row to table
        $('#jsShoeDisplay').append(tableRow);
    }
}

function handleDeleteItem() {
    let $shoeClicked = $(this).parent().data('id');
    console.log(`In handelDeleteItem ${$shoeClicked}`);

    deleteItem($shoeClicked);
}

function deleteItem(shoeID) {
    // AJAX call -----------
    console.log('in deleteItem', shoeID);

    $.ajax({
            type: 'DELETE',
            url: `/shoes/${shoeID}`,
        })
        .then((response) => {
            getShoes();
        })
        .catch((err) => {
            console.log('There was an error!', err);
        });
}

function handleEditItem() {
    const shoeID = $(this).parent().parent().data('id');
    const $item = $(this).parent();
    $item.html(`
    <input class="js-new-price" placeholder="Input new price" type="number">
    <span class="btn js-btn-confirm-edit">✅</span>

    `);
}

// function putEdit(shoeID) {
//     // make stuff work

//     $.ajax({
//         type: 'PUT',
//         url: `/shoes/${shoeID}`,
//         data:
//     })
// }