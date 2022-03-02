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
        k.parent().remove();
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

}, false);


document.addEventListener("dragstart", function( event ) {
    // store a ref. on the dragged elem
    dragOnpage = true;
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
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

// //on drag over
// dropArea.ondragover = (event) => {
//   event.preventDefault();
//   dropArea.classList.add("active");
//   dragText.textContent = "Release to Upload File";
// };

// //on drag leave
// dropArea.ondragleave = () => {
//   dropArea.classList.remove("active");
//   dragText.textContent = "Drag & Drop to Upload File";
// };

// //on drop
// dropArea.ondrop = (event) => {
//   event.preventDefault();
//   file = event.dataTransfer.files[0];
//   showImage(this);
// };


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