/**
 * @author Rakshith
 */
function placeOrder(stockName,itemCost,stockId){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/orderPayment/placeOrder?userName="+customerEmailID+"&stockCost="+itemCost+"&stockId="+stockId+"",
        dataType: 'text',
        success: function(result){
            console.log(result);
            if(result==="success"){
                $("#successStyle").show();
                setTimeout(function(){
                    $("#successStyle").hide();
                }, 3000);
            }
            getStocks(result);
        }
    });
}