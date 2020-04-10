$(function () {

  const URI = '/api/phones';

  // GET PRODUCTS
  $('#getProducts').on('click', () => {
    $.ajax({
      url: URI,
      success: function (products) {
        let tbody = $('tbody');
        tbody.html('');
        products.forEach(product => {
          tbody.append(`
              <tr>
                <td class="id">${product.id}</td>
                <td>
                  <input type="text" class="name" value="${product.name}"/>
                </td>
                <td><input type="text" class="price" value="${product.price}"/></td>
                <td>
                  <button id="update-button">&#9851;</button>
                  <button id="delete-button">&#10006;</button>
                </td>
              </tr>
          `)
        })
      }
    });
  });

  // POST PRODUCTS
  $('#productForm').on('submit', (e) => {
    e.preventDefault();
    let newProduct = $('#newProduct');
    let newPrice = $('#newPrice');

    $.ajax({
      url: URI,
      method: 'POST',
      data: {
        name: newProduct.val(),
        price: newPrice.val()
      },
      success: function(response) {
       newProduct.val('');
       newPrice.val('');
       $('#getProducts').click();
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
  
  $('table').on('click', '#update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name').val();
    let price = row.find('.price').val();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'PUT',
      data: {
        name: name,
        price: price
      },
      success: function(response) {
        console.log(response);
        $('#getProducts').click();
      }
    });
  });

  $('table').on('click', '#delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();

    $.ajax({
      url: `${URI}/${id}`,
      method: 'DELETE',
      success: function (response) {
       $('#getProducts').click();
      }
    });
  });

  // request the login form
  $('#form_login').submit(()=>{
    $.ajax({
      url : '/connexion',
      type : 'post',
      contentType : 'application/json',
      data : {
        name : username,
        password : password
      },
      success : (response)=>{
        console.log(response);
      }
    });
  });
  $("#logout").click(function(){
    $.ajax({url : "/phones",
    type : 'GET',
    dataType : 'html',
    success : function(result){
        window.location = '/';
    }});
  });

});
