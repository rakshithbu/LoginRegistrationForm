/**
 * @author Rakshith
 */

function getStocks(userType) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/stocks/allStocks",
        contentType: "application/json",
        success: function (result) {

            if(userType==="manager login"){
                $("#stockTable").show();
                $("#stocktbody").empty();
                var list = JSON.parse(result);

                $.each(list, function (index, value) {
                    var stock = ` <td><font color="green">in Stock</font></td>
   <td> <button type="button" style="background-color: red" onclick="changeStockStatus('${value.name}','0')">Out of Stock</button> </td>`

                    if (value.isInStock === 0) {
                        stock = ` <td><font color="red">Out of Stock</font></td>
   <td> <button type="button" style="background-color: green" onclick="changeStockStatus('${value.name}','1')">In Stock</button> </td>`
                    }

                    var data = `<tr>
            <td>${value.name}</td>
            <td>${value.cost} $</td>
             ${stock}
    </tr>`;
                    $("#stocktbody").append(data);
                });
            }else if(userType==="customer login"){

                $("#stockTable").hide();
                $("#customerStockTable").show();
                $("#customerStocktbody").empty();
                var list = JSON.parse(result);

                $.each(list, function (index, value) {
                    var stock = ` <td><font color="green">in Stock</font></td>
   <td> <button type="button" style="background-color: green" onclick="placeOrder('${value.name}','${value.cost}','${value.stockId}')">Payment & Order</button> </td>`

                    if (value.isInStock === 0) {
                        stock = ` <td><font color="red">Out of Stock</font></td>
   <td> <button type="button" style="background-color: gray" onclick="" disabled>Payment & Order</button> </td>`
                    }

                    var data = `<tr>
            <td>${value.name}</td>
            <td>${value.cost} $</td>
             ${stock}
    </tr>`;
                    $("#customerStocktbody").append(data);
                });

            }

        }
    });
}

function changeStockStatus(stockName,stockValue){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/stocks/changeStockStatus?stockName="+stockName+"&stockValue="+stockValue+"",
        success: function (result) {
            console.log(result);
            getStocks("manager login");
        }
    });
}

