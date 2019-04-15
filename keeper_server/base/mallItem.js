//商店类

class mall{
	constructor(){
		this.id = "",
		this.url = "",
		this.data = []
	}

	setID(id){
		this.id = id;
	}

	getID(){
		return this.id;
	}

	setUrl(url){
		this.url = url;
	}

	getUrl(){
		return this.url;
	}

	addData(data){
		
	}
}

module.exports = mall;