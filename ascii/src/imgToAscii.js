/*
Adapted from:

https://github.com/victorqribeiro/imgToAscii

*/

class imgToAscii {
	constructor(image,size,charType){
		this.size = ( size <= 0 || size > 1 ? 1 : size) || 1;
		this.charType = charType || 0;
		this.alphabet = {
			0: ["@","%","#","*","+","=","-",":","."," "],
			1: ["$","@","B","%","8","&","W","M","#","*","o","a","h","k","b","d","p","q","w","m","Z","O",
					"0","Q","L","C","J","U","Y","X","z","c","v","u","n","x","r","j","f","t","/","\\","|","(",
					")","1","{","}","[","]","?","-","_","+","~","\<","\>","i","!","l","I",";",":",",","\"","^",
					"`","'","."," "]
		}
		this.string = "";
		this.stringColor = "";
		this.imageSrc = image;
		this.loadImage = new Promise( (resolve,reject) =>{
			this.image = new Image();
			this.image.src = this.imageSrc;
			this.image.onload = ()=> {
				this.canvas = document.createElement('canvas');
				this.canvas.width = this.image.width * this.size;
				this.canvas.height = this.image.height * this.size;
				this.context = this.canvas.getContext('2d');
				this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
                this.context.crossOrigin = "Anonymous";
				this.imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
				let grayStep = Math.ceil( 255 / this.alphabet[this.charType].length );
				for(let i = 0; i < this.imageData.data.length; i+=4){
					for(let j = 0; j < this.alphabet[this.charType].length; j++){
						let r = this.imageData.data[i];
						let g = this.imageData.data[i+1];
						let b = this.imageData.data[i+2];
						if( (r * 0.2126) + (g * 0.7152) + (b * 0.0722) < (j+1) * grayStep ){
						    const char = this.alphabet[this.charType][j];
							this.string += char
							this.stringColor += "<span style=\"color: rgb("+r+","+g+","+b+"); \">" 
															 +(char.replace(' ', '&nbsp;'))
															 +"</span>";
							break;	
						}
					}
					if( !((i/4+1) % this.canvas.width) ){
						this.string += "\n";
						this.stringColor += "<br>";
					}
				}
				resolve();
			};
			this.image.error = reject;
		}).catch( e => console.error(e) );
	}
	

	async display(){
		await this.loadImage;
		document.getElementById("imgToAscii").innerHTML = this.string;

	}

	async hide(){
        const pre = this.getPreElement();
		pre.innerText = "";
		return pre
	}

	async displayColor(bg, appendToBody = true){
		const pre = this.getPreElement();
		pre.style.backgroundColor = bg;
		if(appendToBody)
		    document.getElementById("imgToAscii").appendChild(pre);
		await this.loadImage;
		pre.innerHTML = this.stringColor;
		if(!appendToBody)
		    return pre
	}

}