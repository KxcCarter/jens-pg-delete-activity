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
    // targets jQuery element
    const $update = $(this).parent().children('.js-new-price');

    // if this is the first time button has been clicked, no data has been input into value
    // and therefore $update.length === 0, so this block is skipped.
    if ($update.length > 0) {
        // collects and stores data from the <tr> and the user input
        const shoeID = $(this).parent().parent().parent().data('id');
        const newPrice = $('.js-new-price').val();

        // calls the putEdit function passing in the above data.
        putEdit(shoeID, newPrice);
        return;
    }

    // replaces all data in this <td> with the following html - includes a clickable span
    // with the same js class as the 'edit' button which was used to call this function.
    // Also creates an input field where the user can change price.
    $(this).parent().html(`
    <div class="js-update-div">
    <input class="js-new-price" placeholder="Input new price" type="number">
    <span class="btn js-item-edit">✅</span>
    </div>
    `);
}

function putEdit(shoeID, newPrice) {
    $.ajax({
            type: 'PUT',
            url: `/shoes/${shoeID}`,
            data: { newPrice },
        })
        .then((response) => {
            console.log(response);
            getShoes();
        })
        .catch((err) => {
            console.log(
                `There was a terrrible, horrible, no good, very bad mistake! ${err}`
            );
        });
}