function redirect_home()
{
    location.href = "./index.html";
}

function templates()
{
    location.href = "./templates.html";
}

function signin()
{
    location.href = "./signin.html";
};

function add_select(str)
{
    if (str == "color")
    {
        document.getElementById("color-choice").style.display = "flex";
        document.getElementById("image-choice").style.display = "none";

    }
    else
    {
        document.getElementById("color-choice").style.display = "none";
        document.getElementById("image-choice").style.display = "block";
        
    }
}

function changeObjBkg()
{
    document.getElementById("sample-object").style.backgroundColor = document.getElementById("background-col").value;
}

function changeObjText()
{
    document.getElementById("sample-object").innerHTML = document.getElementById("object-text").value;
}

function changeObjTxtCol()
{
    document.getElementById("sample-object").style.color = document.getElementById("text-col").value;
}
