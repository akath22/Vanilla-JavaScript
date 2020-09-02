let input=document.getElementById('filterInput');

let list=document.querySelectorAll('.collection-item');

input.addEventListener('keyup',SearchItem);

function SearchItem(e){
     Array.from(list).forEach((item)=>{
         if(item.textContent.toLowerCase().indexOf(input.value.toLowerCase())===-1){
             item.style.display='none';
         }else{
            item.style.display='block';
         }
     })
}