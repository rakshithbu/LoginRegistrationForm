/**
 * @author Rakshith
 */

var customerEmailID = '';

function registration() {
    var obj=  {};
    obj.userName = $("#usernamesignup").val();
    obj.age = parseInt($("#age").val());
    obj.email = $("#emailsignup").val();
    obj.contactNumber = parseInt($("#contactNumber").val());
    obj.address = $("#address").val();
    obj.password = $("#passwordsignup").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/customer/register",
        dataType: 'text',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function(result){
        if(result==="success"){
            $("#successStyle").show();
            $('html, body').animate({
                scrollTop: $("#successStyle").offset().top
            }, 100);
            setTimeout(function(){ $("#successStyle").hide();
            console.log(window.location.href.replace("toregister","tologin"));
                window.location.href = window.location.href.replace("tologin","tologin");
            }, 2000);
        }
        }
    });
}

function login() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/customer/login?userName="+$("#username").val()+"&password="+$("#password").val(),
        dataType: 'text',
        success: function(result){
            console.log(result);
            if(result==="manager login" || result==="customer login"){
               $("#login").hide();
               $("#register").hide();
            }
            if(result==="customer login"){
                customerEmailID = $("#username").val();
            }
            getStocks(result);
        }
    });
}

function logout(){
    location.reload();
}