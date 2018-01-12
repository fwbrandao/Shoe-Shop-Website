$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();
    
    
    
    // In this example, if you make an ajax request to the following website
    var myUrl = "http://fernandobrandao.co.uk/contact.php";
    //  But if you make it from a browser, then it will work without problem ...

    // However to make it work, we are going to use the cors-anywhere free service to bypass this
    var proxy = 'https://cors-anywhere.herokuapp.com/';


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            //var url = "http://7startraining.com/contact.php";
            
            
            // The proxy url expects as first URL parameter the URL to be bypassed
            // https://cors-anywhere.herokuapp.com/{my-url-to-bypass}
            var url= proxy + myUrl;

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    //console.log(data);
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the 
                    /*var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;*/
                    
                    var messageText = data;
                    
                    //console.log(messageText);
                    
                    // let's compose Bootstrap alert box HTML
                    /*var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';*/
                    
                    
                    var alertBox = '<div class="alert alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    
                    
                    // If we have messageAlert and messageText
                    //if (messageAlert && messageText) {
                    if (messageText) {
                        //console.log(messageText);
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});