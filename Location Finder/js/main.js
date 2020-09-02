let input=document.getElementById('input');
let pinIcon= document.getElementById('pin-icon');
let removeIcon= document.getElementById('remove-icon');
let form=document.getElementById('form');
let output=document.getElementById('output');

input.addEventListener('click',colorIcon);
document.addEventListener('click',(e)=>{
    if (e.target !==input  && e.target!==pinIcon && e.target!==removeIcon){
        pinIcon.style.color='rgb(211, 207, 207)';
        removeIcon.style.color='rgb(211, 207, 207)';
    }
});

function colorIcon(){
    pinIcon.style.color='gray';
    removeIcon.style.color='gray';
}

form.addEventListener('submit',display);

function display(e) {
    e.preventDefault();
    value=input.value;
    removeIcon.style.display='none';
    output.innerHTML='';
    fetch(`https://api.zippopotam.us/us/${value}`)
    .then(res=>{
        if(res.status!=200){
            throw Error();
        } else {
            return res.json();
        }
    })
    .then((data)=> {
        removeIcon.className='fa fa-check fa-lg';
        removeIcon.style.display='block';
        output.innerHTML=`<div class="amate">
        <div class="d-flex flex-row bg-success p-1 " style="border-radius: 4px 4px 0 0;">
        <div class="mr-auto ml-2 mt-1">
            <h5 class="h6">Location Info</h5>
        </div>
        <div class="ml-auto mr-2">
            <span class="fa-stack" id="output-remove">
                <i class="fa fa-circle fa-lg fa-stack-1x" style="color: green;"></i>
                <i class="fa fa-times fa-xs fa-stack-1x fa-inverse"></i>
              </span> 
        </div>
        </div>
        <ul class="list-group text-dark items">
            <li class="list-group-item pt-3"><strong>City:</strong> ${data.places[0]["place name"]}</li>
            <li class="list-group-item"><strong>State:</strong> ${data.places[0].state}</li>
            <li class="list-group-item"><strong>Longitude:</strong> ${data.places[0].longitude}</li>
            <li class="list-group-item pb-3"><strong>Latitude:</strong> ${data.places[0].latitude}</li>
        </ul>
        </amate>`
        document.getElementById('output-remove').addEventListener('click',(e)=>{
            output.innerHTML='';
            input.value='';
        });
    })
    .catch((err)=>{
        errMessage=document.createElement('p');
        errMessage.className='error border border-danger text-danger p-3 rounded amate';
        errMessage.innerText='Invalid Zipcode, please try again';
        output.appendChild(errMessage);
        removeIcon.className='fa fa-times fa-lg';
        removeIcon.style.display='block';
    });
}

removeIcon.addEventListener('click',()=>{
    if(removeIcon.classList.contains('fa-times')){
    output.innerHTML='';
    removeIcon.style.display='none';
    input.value='';
    }
});

