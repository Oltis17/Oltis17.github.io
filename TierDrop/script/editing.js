function AddR(k) 
{
    var newDiv = k.parent().parent().children(':first-child').clone();
    $(newDiv).find(".tier-col-l").find("div").text("NEW");
    $(newDiv).find(".tier-col-l").css("background-color", "lightgray");
    newDiv.insertBefore(k.parent());
}

function DeleteR(k) 
{
    if (confirm("Delete entire row?") == true)
    {
        k.parent().parent().remove();
    }
}

function UpR(k) 
{
    var parent = k.parent().parent();
    var pos = parent.prev();
    parent.insertBefore(pos);
}

function DownR(k) 
{
    var parent = k.parent().parent();
    var pos = parent.next();
    if ($(pos).attr("id") == "btn-area")
    {
        return;
    }
    parent.insertAfter(pos);
}


$(document).on('click', '#add-row', function () 
{
    AddR($(this));
});

$(document).on('click', '.delete-row', function () 
{
    DeleteR($(this));
});

$(document).on('click', '.up', function () 
{
    UpR($(this));
});

$(document).on('click', '.down', function () 
{
    DownR($(this));
});