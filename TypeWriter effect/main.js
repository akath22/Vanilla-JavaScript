class TypeWriter{
    constructor(txtElement,words,wait=3000){
        this.txtElement=txtElement;
        this.words=words;
        this.txt='';
        this.current=0;
        this.wordIndex=0;
        this.wait=parseInt(wait,10);
        this.type();
        this.isDeleting=false;
    }

    type() {
        let typeSpeed=300;
        if(this.txt != this.words[this.current] && !this.isDeleting){
            this.txt = this.words[this.current].substring(0,this.wordIndex+1);        
            this.wordIndex +=1;
            this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;
            if(this.txt === this.words[this.current]){
                this.isDeleting=true;
                typeSpeed=this.wait;
            }
        }
        else if(this.txt !='' && this.isDeleting){
            this.txt = this.words[this.current].substring(0,this.wordIndex-1);        
            this.wordIndex -=1;
            this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;
            typeSpeed=typeSpeed/2;
            if(this.txt ==''){
                this.wordIndex=0;
                this.current+=1;
                this.isDeleting=false;
                typeSpeed=500;
            }
        }
        if(this.current>=this.words.length){
            this.current=0;
        }
        setTimeout(()=> this.type(),typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded',init);

function init(params) {
    const txtElement=document.querySelector('.txt-type');
    const words=JSON.parse(txtElement.getAttribute('data-words'));
    const wait=txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement,words,wait);
}