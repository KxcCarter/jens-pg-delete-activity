$(document).ready(handleReady);

function handleReady() {
  // Set up click listeners
  $('#submit').on('click', handleSubmit);


  // Get data
  getShoes();
}

function handleSubmit() { 
  const name = $('#name').val();
  const size = $('#size').val();
  const cost = $('#cost').val();

  const objectToSend = {
    name : name,
    size : size,
    cost : cost
  }

  $.ajax({
    method: 'POST',
    url: '/shoes',
    data : objectToSend
  }).then( function(response ) {
    //database is updated, need to update DOM
    getShoes();
  }).catch(function(err){
    console.log(err);
    alert('Something went wrong in POST');
  })

 }

function getShoes() {
  $.ajax({
      method: 'GET',
      url: '/shoes'
  }).then(function(response) {
      console.log('getShoes - response', response);

      //Append Shoes
      appendShoeTable(response);
  }).catch(function(error){
      console.log('getShoes - error', error);
      alert('something went wrong in GET')
  })
}

function appendShoeTable(shoes) {
  //empty old data
  $('#shoeDisplay').empty();

  for (let shoe of shoes) {
    console.log(shoe);
    //make a row with info
    let tableRow = $(`
    <tr>
      <td>${shoe.name}</td>
      <td>${shoe.cost}</td>
      <td>${shoe.size}</td>
    </tr>
    `)

    // attach data to row, need for delete
    tableRow.data('id', shoe.id);

    //append row to table
    $('#shoeDisplay').append(tableRow);
  }
}