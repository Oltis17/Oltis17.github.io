function AddR(k) 
{
    var newDiv = k.parent().parent().children(':first-child').clone();
    $(newDiv).find(".tier-col-l").find("div").text("NEW");
    $(newDiv).find(".tier-col-l").css("background-color", "#999999");
    newDiv.insertBefore(k.parent());
    $('[data-toggle="popover"]').popover();
}

function DeleteR(k) 
{
    if (confirm("Delete entire row?") == true)
    {
        if (document.getElementById("tier-list").childElementCount == 2)
        {
            alert("List must have a least 1 row.");

        }
        else
        {
            k.parent().remove();
        }
        
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


function clearList()
{
    if (confirm("Do you want to clear list? All progress will be deleted.") == true)
    {
        window.location.reload();
    }

}


let dragOnpage = false;
let dragged;

document.addEventListener("dragover", function(event) {
    event.preventDefault();
  }, false);

document.addEventListener("dragenter", function( event ) {
    // highlight potential drop target when the draggable element enters it
    if ( event.target.className == "tier-col-m" ) {
        event.target.style.background = "gray";
    }

}, false);

document.addEventListener("dragleave", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( event.target.className == "tier-col-m" ) {
        event.target.style.background = "";
    }

}, false);

document.addEventListener("drop", function( event ) {
    // reset background of potential drop target when the draggable element leaves it
    event.preventDefault();
    if ( event.target.className == "tier-col-m" ) {
        if (!dragOnpage)
        {
            imageInput(event);
            event.target.style.background = "";
        }
        else
        {
            dragged.remove();
            imageInput(event);
            event.target.style.background = "";
        }
        
    }

    if ( event.target.id == "add-row" ) {
        dragged.remove();
    }
    document.getElementById("add-row").innerHTML = '<i class="fa-solid fa-circle-plus"></i> Add row';
    document.getElementById("add-row").style.backgroundColor = "#6c757d";
    document.getElementById("add-row").style.borderColor = "#6c757d";

}, false);


document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    dragOnpage = true;
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
    document.getElementById("add-row").innerHTML = "Delete image";
    document.getElementById("add-row").style.backgroundColor = "red";
    document.getElementById("add-row").style.borderColor = "red";
}, false);

document.addEventListener("dragend", function( event ) {
    // reset the transparency
    dragOnpage = false;
    event.target.style.opacity = "";
}, false);



//Get DOM Elements
let file; 
let par;

function imageInput(event) 
{
    event.preventDefault();
    var dt = event.dataTransfer;

    file = event.dataTransfer.files[0];
    par =  event.target;
    showImage(); 

};


//change the image to droped imagege
function showImage()
{
  let fileType = file.type;
  let validFiletypes = ["image/jpeg", "image/jpg", "image/png"];
  
  if(validFiletypes.includes(fileType)){
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = ()=>{
        let fileURL = fileReader.result;
        let image = document.createElement("img");
        image.classList = "drag-img";
        image.src = fileURL;
        par.appendChild(image);
        }
    }
  else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}


$(document).ready(function(){

    $('[data-toggle="popover"]').popover();

});

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

let current;
$(document).on('click', '.more', function (event) 
{
    current = this.parentElement.querySelector("div");
    document.getElementById("row-name").value = this.parentElement.querySelector("div").innerHTML;
    document.getElementById("row-color").value = rgb2hex(this.parentElement.style.backgroundColor);
    var divsToHide = document.getElementsByClassName("more"); 
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none"; 
    }
});


//   $('[data-toggle="popover"]').each( function() {
//     //document.getElementsByClassName("row-name").value = this.parentElement.querySelector("div").innerHTML;
//     $(this).popover();
    
//   });

  $('html').on('click', function(e) {
    if (typeof $(e.target).data('original-title') == 'undefined' &&
       !$(e.target).parents().is('.popover')) {
      $('[data-original-title]').popover('hide');
      var divsToHide = document.getElementsByClassName("more"); //divsToHide is an array
            for(var i = 0; i < divsToHide.length; i++){
                divsToHide[i].style.display = ""; 
            }
    }
  });


  $(document).on('input', '#row-name', function () 
{
    current.innerHTML = this.value;
});

$(document).on('input', '#row-color', function () 
{
    current.parentElement.style.backgroundColor = this.value;
    col = current.parentElement.style.backgroundColor
    let rgb = col.slice(
        col.indexOf("(") + 1, 
        col.indexOf(")")
    ).split(", ");
    const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                      (parseInt(rgb[1]) * 587) +
                      (parseInt(rgb[2]) * 114)) / 1000);
    const textColour = (brightness > 125) ? 'black' : 'white';
    current.parentElement.style.color = textColour;
});
