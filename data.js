function Ajax(m,url,c,x){
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(m,url, true);
		xhr.setRequestHeader("Content-Type",c);
		xhr.onload = function () {
			if (this.readyState==4 && this.status == 200) resolve(xhr.response);
			else {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				statusText: xhr.statusText
			});
		};
		xhr.send(x||null);
	});
}
function objectToArray(obj){
	let keys = Object.keys(obj),res = [];
	for(let i = 0; i < keys.length; i++) res.push(obj[keys[i]]);
	return res;
}
async function getData(type){
	let response = await Ajax("GET","./App/?"+type+"=1","application/json;charset=UTF-8");
	return ((response)?JSON.parse(response):"");
}
async function modifyData(type,id,jsonData){
	let response = await Ajax("POST","./App/?"+type+"=1&m="+id,"application/json;charset=UTF-8",jsonData);
	return JSON.parse(response);
}
async function addData(type,jsonData){
	await Ajax("POST","./App/?"+type+"=1","application/json;charset=UTF-8",jsonData);
}
async function deleteData(type,id){
	await Ajax("POST","./App/?"+type+"=1&s="+id,"application/json;charset=UTF-8");
}
async function AddUser(data){
	let jsonData = JSON.stringify({"id_dep":data});
	await addData("un",jsonData);
}
async function modifyUser(data){
	let jsonData = JSON.stringify({"id_dep":data});
	let user = await modifyData("un",1,jsonData);
	return objectToArray(user).reverse();
}
async function deleteUser(){
	await deleteData("un",1);
}
async function getUser(){
	let user = await getData("un");
	return objectToArray(user);
}
async function getUsers(){
	let users = await getData("u");
	let array =[];
	for(let i=0;i<users.length;++i){
		array.push(objectToArray(users[i]));
	}
	return array.reverse();
}
async function AddBandes(data){
	let jsonData = JSON.stringify({"nom":data[0],"couleur":data[1]});
	await addData("b",jsonData);
}
async function modifyBandes(data,id){
	let jsonData = JSON.stringify({"nom":data[0],"couleur":data[1]});
	let bande = await modifyData("b",id,jsonData);
	return objectToArray(bande).reverse();
}
async function deleteBandes(id){
	deleteData("b",id);
}
async function getBandes(){
	let bandes = await getData("b");
	let array =[];
	for(let i=0;i<bandes.length;++i){
		array.push(objectToArray(bandes[i]));
	}
	return array.reverse();
}
async function modifyDep(data,id){
	let jsonData = JSON.stringify({"id_bande":data[0],"id_dep":data[1]});
	let dep = await modifyData("d",id,jsonData);
	return objectToArray(dep).reverse();
}
async function deleteDep(id){
	deleteData("d",id);
}
async function addDep(data){
	let jsonData = JSON.stringify({"id_bande":data[0],"id_dep":data[1]});
	await addData("d",jsonData);
}
async function getDep(){
	let dep = await getData("d");
	let array =[],nb_personne=[];//id_bande,nbpersonne
	for(let i=0;i<dep.length;++i){
		let littleArray = objectToArray(dep[i]);
		array.push([littleArray[0],littleArray[1]]);
	}
	return array.reverse();
}
