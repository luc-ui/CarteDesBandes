function SizeWindow(){
	let h = Number(document.getElementById("CarteSvg").clientHeight),
	w = Number(document.getElementById("CarteSvg").clientWidth),
	g = document.querySelectorAll("g"),
	text = document.querySelectorAll("text"),
	tspan = document.querySelectorAll("tspan"),
	rect = document.querySelectorAll("rect"),
	path = document.querySelectorAll("path");
	let ww = window.innerWidth || doc.documentElement.clientWidth,
	hw = window.innerHeight || doc.documentElement.clientHeight,r=ww/w;
	document.getElementById("CarteSvg").setAttribute("width",ww-20);
	document.getElementById("CarteSvg").setAttribute("height",h*r-20);
	for(let i=0;i<g.length;++i){
		let a = g[i].getAttribute("transform");
		if(a!=null){
			let b=a.split("(")[1].split(")")[0].split(",").map(a=>Number(a)*r).join(",");
			if(a[0]=="t"){
				g[i].setAttribute("transform","translate("+b+")");
			}
			else if(a[0]=="m"){
				b=[b.split(",")[0]/r,0,0,b.split(",")[3]/r,b.split(",")[4],b.split(",")[5]].join(",");
				g[i].setAttribute("transform","matrix("+b+")");
			}
		}
	}
	for(let i=0;i<text.length;++i){
		let x = text[i].getAttribute("x"),y = text[i].getAttribute("y"),c=r*x,d=r*y;
		text[i].setAttribute("x",c);
		text[i].setAttribute("y",d);
	}
	for(let i=0;i<tspan.length;++i){
		let x = tspan[i].getAttribute("x"),y = tspan[i].getAttribute("y"),c=r*x, d=r*y;
		tspan[i].setAttribute("x",c);
		tspan[i].setAttribute("y",d);
	}
	for(let i=0;i<rect.length;++i){
		let x = rect[i].getAttribute("x"),y = rect[i].getAttribute("y"),wr = rect[i].getAttribute("width"),hr = rect[i].getAttribute("height"),c=r*x,d=r*y,e=r*wr,f=r*hr;
		rect[i].setAttribute("x",c);
		rect[i].setAttribute("y",d);
		rect[i].setAttribute("width",e);
		rect[i].setAttribute("height",f);
	}
	for(let i=0;i<path.length;++i){
		let a = path[i].getAttribute("d");
		c=a.split(" ").map(k=>(!isNaN(k.split(",")[0]))?[Number(k.split(",")[0])*r,Number(k.split(",")[1])*r].join(","):k[0]).join(" ");
		path[i].setAttribute("d",c);
	}
}
function MatchDepXmlToNameXml(){
	window.liste_dep_prop=[];
	for(let i=0;i<all_dep_xml_element.length;++i){
		if(all_dep_xml_element[i].id.toString().split("_")[1]!="Reg"){
			let id = all_dep_xml_element[i].id, 
			fill = defaut_fill,
			num = Number(all_dep_xml_element[i].id.toString().split("_")[0].match(/\d+/)[0]),
			name = all_dep_xml_element[i].id.toString().split("_")[1];
			for(let j=0;j<all_dep_name_element.length;++j){
				if(all_dep_name_element[j]==name){
					//id du path, nom dep, num dep, couleur de base, indice dans la liste 1 path, idem 2 name_text
					liste_dep_prop.push([id,name,num,fill,i,j]);
				}
			}
		}
	}
}			
function DepSelectedByuser(num_dep_select,i){
	if(user=="User"){
		let current_fill = all_dep_xml_element[i].getAttribute("fill"),current_n=selected_departement_user.length,fill=liste_dep_prop[i][3];
		if(current_fill==fill && current_n<num_dep_select){
			all_dep_xml_element[i].setAttribute("fill","#000000");
			selected_departement_user.push(liste_dep_prop[i][4]);
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","yellow");
			AddUser(liste_dep_prop[i][4]);
		}
		else if(current_fill==fill && current_n==num_dep_select){
			let a = selected_departement_user.pop();
			all_dep_xml_element[a].setAttribute("fill",liste_dep_prop[a][3]);
			all_dep_name_xml_element[ConvertItoJ(a)].setAttribute("fill",convertRgbToHex(invertColor(convertHexToRgb(liste_dep_prop[a][3]))));
			all_dep_xml_element[i].setAttribute("fill","#000000");
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","yellow");
			selected_departement_user.push(liste_dep_prop[i][4]);
			modifyUser(liste_dep_prop[i][4]);
		}
		else if(current_fill!=fill){
			let a = selected_departement_user.indexOf(i);
			let ii = selected_departement_user[a];
			all_dep_xml_element[ii].setAttribute("fill",liste_dep_prop[ii][3]);
			all_dep_name_xml_element[ConvertItoJ(ii)].setAttribute("fill",convertRgbToHex(invertColor(convertHexToRgb(liste_dep_prop[ii][3]))));
			selected_departement_user.splice(a,1);
			deleteUser();
		}
		DisplayDepChoose();
	}else if(user=="Admin"){DepMultipleSelectedByuser(num_dep_select,i);}
}
function DisplayDepChoose(){
	let a=liste_dep_prop[selected_departement_user[0]];
	document.getElementById("depuserchoose").innerHTML=(a)?a[2]+" - "+a[1]:"";
}
function GetIndiceDepAdmin(){
	indiceSelectedDep = [],b=[];
	for(let i=0;i<selected_departement_admin.length;++i){
		for(let j=0;j<Bandes.length;++j){
			if(selected_departement_admin[i][1]==Bandes[j][2] && Bandes[j][0]==cBande){
				indiceSelectedDep.push(selected_departement_admin[i][0]);
				b.push(selected_departement_admin[i][1]);
			}
		}
	}
	return [indiceSelectedDep,b];
}			
async function DepMultipleSelectedByuser(num_dep_select,i){
	let current_fill = all_dep_xml_element[i].getAttribute("fill"),fill=liste_dep_prop[i][3];
	let indiceSelectedDep = GetIndiceDepAdmin()[0],colorfill="";
	for(let j=0;j<Bandes.length;++j){(Bandes[j][0]==cBande)?colorfill=Bandes[j][1]:""}
	let  c = convertRgbToHex(invertColor(convertHexToRgb(colorfill)));
	let w=false;
	for(let j=0;j<Bandes.length;++j){
		w = w||current_fill==convertRgbToHex(moreTransparent(convertHexToRgb(Bandes[j][1]),120))
	}
	if((current_fill==fill || current_fill==convertRgbToHex(moreTransparent(convertHexToRgb(fill),50)))&&!w){
		all_dep_xml_element[i].setAttribute("fill",colorfill);
		all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
		let w=""
		for(let j=0;j<Bandes.length;++j){(Bandes[j][0]==cBande)?w=j:""}
		selected_departement_admin.push([liste_dep_prop[i][4],Bandes[w][2]]);
		await addDep([Bandes[w][2],liste_dep_prop[i][4]]);
	}
	else{
		for(let k=0;k<selected_departement_admin.length;++k){
			if(selected_departement_admin[k][0]==i){
				all_dep_xml_element[i].setAttribute("fill",liste_dep_prop[i][3]);
				all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","#000");
				selected_departement_admin.splice(k,1);
				await deleteDep(i);
			}
		}
	}
	DisplayDepBandes();
}
function DisplayDepBandes(){
	let text = "";
	text+="<table>";
	text+="<tr>";
	let a=[],b=[],m=0,table=[];
	for(let i=0;i<Bandes.length;++i){
		a=[];
		for(let j=0;j<selected_departement_admin.length;++j){
			(selected_departement_admin[j][1]==Bandes[i][2])?a.push(selected_departement_admin[j][0]):"";
		}
		m=(m<a.length)?a.length:m;
		b.push(a);
	}
	for(let i=0;i<liste_dep_prop.length;++i){
		table.push([])
		for(let j=0;j<liste_dep_prop[i].length;++j){
			table[i].push(liste_dep_prop[i][j]);
		}
		table[i].push(0);
	}
	for(let k=0;k<b.length;++k){
		for(let w=0;w<b[k].length;++w){
			for(let y=0;y<listOfUser.length;++y){
				if(b[k][w]==listOfUser[y]){
					table[b[k][w]][6]+=1;
				}
			}
		}
	}
	for(let i=0;i<Bandes.length;++i){
		let nb=0;
		for(let j=0;j<b[i].length;++j){
			nb += table[b[i][j]][6];
		}
		text+="<th>"+Bandes[i][0]+" ("+nb+")</th>";
	}
	text+="</tr>";
	for(let k=0;k<m;++k){
		text+="<tr>";
		for(let i=0;i<Bandes.length;++i){
			text+=(b[i][k]>-1)?"<td>"+table[b[i][k]][2] + " - "+table[b[i][k]][1]:"<td></td>";
			text+=(b[i][k]>-1 && table[b[i][k]][6]>0)?" ("+table[b[i][k]][6]+")</td>":"";
		}
		text+="</tr>";
	}
	text+="</table>";
	document.getElementById("tabledepbandes").innerHTML=text;
}
async function ChoiceUsers(){
	let text="";
	text+="<input type=\"radio\" name=\"sr\" id=\"ts\"";
	text+=(user=="Admin")?" checked ":"";
	text+=" value=\"Admin\"/>Admin";
	text+=" | ";
	text+="<input type=\"radio\" name=\"sr\" id=\"ts\"";
	text+=(user=="User")?" checked ":"";
	text+=" value=\"User\"/>User";
	document.getElementById("typeselection").innerHTML="<p>Utilisateur: "+text+"</p>";
	if(user=="Admin"){
		ChoiceAdminBande();
		DisplayDepBandes();
	}else{
		ClearDivBande();
	}
	AddNumberUserToDep();
	document.getElementById("typeselection").onchange = async function (){
		listOfUser = await getUsers();
		j=document.querySelector("input[type=radio][name=sr]:checked").getAttribute("value");
		user=j;
		DispDepSelecedUser();
		ClearSelectedDep();
		DisplayDepBandes();
		AddNumberUserToDep();
		document.getElementById("depuserchoose").innerHTML="";
		(user=="Admin")?ChoiceAdminBande():ClearDivBande();
	}
}
function ClearDivBande(){
	document.getElementById("cdbdiv").innerHTML="";
	MakeDepMore(-1);
	cBande="";
	document.getElementById("tabledepbandes").innerHTML="";
}
function ChoiceAdminBande(){
	let text="";
	let trash = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
	let pen = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/></svg>';
	let plus = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>';
	let eye = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>';
	window.save = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/><path fill-rule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>';
	for(let i=0;i<Bandes.length;++i){
		let a=(cBande==Bandes[i][0])?"checked":"";
		text+="<span  class=\"uneBande\"><span id=\"modifBande_"+i+"\"><span class=\"span\" style=\"color:"+Bandes[i][1]+"\">"+Bandes[i][0]+"</span><span class=\"edit span\">"+pen+"</span></span><span class=\"span\" id=\"deleteB_"+i+"\">"+trash+"</span><input class=\"selectorradiobande\" type=\"radio\" "+a+" name=\"cdb\" id=\"ts_"+i+"\" value=\""+Bandes[i][0]+"\"/><label class=\"span\" for=\"ts_"+i+"\">"+eye+"</label></span>";
	}
	text+=" <span class=\"span\" id=\"ajoutBande\">"+plus+" Ajouter une bande </span>";
	document.getElementById("cdbdiv").innerHTML="<p>Bandes:"+text+"</p>";
	document.getElementById("ajoutBande").addEventListener("click", (e)=>AjoutBande(),{once:true});
	let divDelete = document.querySelectorAll("[id^='deleteB_']");
	for(let i=0;i<divDelete.length;++i){
		divDelete[i].addEventListener("click", (e)=>SpprBande(divDelete[i].id),{once:true});
	}
	let spanModif = document.querySelectorAll("[id^='modifBande_']");
	for(let i=0;i<spanModif.length;++i){
		spanModif[i].addEventListener("click", (e)=>ModifBande(i),{once:true});
	}
	DepMapChange();
	document.getElementById("cdbdiv").onchange = function(){ 
		let radioChecked = document.querySelector("input[type=radio][name=cdb]:checked");
		cBande=(radioChecked)?radioChecked.getAttribute("value"):"";
		DepMapChange();
	};
}
function ModifBande(i){
	document.getElementById("modifBande_"+i).setAttribute("class","span");
	document.getElementById("deleteB_"+i).setAttribute("class","");
	document.getElementById("modifBande_"+i).innerHTML="<input type=\"text\" id=\"ModifBandeInput\" placeholder=\""+Bandes[i][0]+"\" value=\""+Bandes[i][0]+"\" col=3 row=1/><input value=\""+Bandes[i][1]+"\" id=\"colorForB\" type=\"color\"/> | <span style=\"color:#fff\" id=\"CloseModif\">"+save+"</span>";
	document.getElementById("deleteB_"+i).innerHTML="";
	document.getElementById("ModifBandeInput").addEventListener("keyup", function onEvent(e) {
		Bandes[i][0] = document.getElementById("ModifBandeInput").value;		
	});
	document.getElementById("colorForB").addEventListener("change", (e) =>Bandes[i][1] = e.target.value);
	document.getElementById("CloseModif").addEventListener("click", function (e){
		modifyBandes(Bandes[i],Bandes[i][2]);
		document.getElementById("modifBande_"+i).setAttribute("class","");
		document.getElementById("deleteB_"+i).setAttribute("class","span");
		ChoiceAdminBande();
	});
}
function AjoutBande(){
	document.getElementById("ajoutBande").innerHTML="<input type=\"text\" id=\"AjouBandeInput\" placeholder=\"Nom\" col=3 row=1/><input id=\"colorForB\" type=\"color\"/> | <span id=\"crossInput\">"+save+"</span>";
	let t=[-1,-1];
	document.getElementById("ajoutBande").addEventListener("keyup", async function onEvent(e) {
		t[0] = document.getElementById("AjouBandeInput").value;
		if (e.keyCode === 13) {
			t = (t[1]!=-1)? t :[t[0],MakeColor()];
			await bandeAjax(t);
		}
	});
	document.getElementById("colorForB").addEventListener("change", (e) => t[1] = e.target.value);
	document.getElementById("crossInput").addEventListener("click", async function (e){
		await bandeAjax(t);
	});
}
async function bandeAjax(t){
	t = (t[1]!=-1)? t :[t[0],MakeColor()];
	if(t[0]!=-1){
		AddBandes(t);
		let bs = await getBandes();
		Bandes.push(bs[bs.length-1]);
	}
	ChoiceAdminBande();
}
function MakeColor(){
	let upset = 150, r = Math.floor(Math.random()*upset),g = Math.floor(Math.random()*upset),b = Math.floor(Math.random()*255);
	return convertRgbToHex([r,g,b]);
}
async function SpprBande(id){
	let a=[];
	id = Bandes.splice(Number(id.split("_")[1]),1)[0][2];
	for(let i=0;i<selected_departement_admin.length;++i){
		if(selected_departement_admin[i][1]==id){
			await deleteDep(selected_departement_admin[i][0]);
		}		
	}
	window.selected_departement_admin= await getDep();
	deleteBandes(id);
	ChoiceAdminBande();
}
function DepMapChange(){
	DisplayDepBandes();
	MakeDepMore(-1);
	MakeDepMore(1);
}
function ConvertIdLtoIdddb(id){
	let a = "";
	for(let j=0;j<Bandes.length;++j){(Bandes[j][2]==id)? a = j:""}
	return a;
}
async function AddNumberUserToDep(){
	for(let i=0;i<all_dep_xml_element.length;++i){
		for(let j=0;j<listOfUser.length;++j){
			if(listOfUser[j]==i){
				let text = all_dep_name_xml_element[ConvertItoJ(i)].innerHTML;
				let n = text.length;
				if(text[n-1]!=")" && user=="Admin"){
					all_dep_name_xml_element[ConvertItoJ(i)].innerHTML=text+" (1)";
				}
				else{
					let tou = text.split("(");
					if(user=="Admin"){
						let num = Number(tou[1].split(")")[0])+1;
						all_dep_name_xml_element[ConvertItoJ(i)].innerHTML=tou[0]+" ("+num+")";
					}
					else{
						all_dep_name_xml_element[ConvertItoJ(i)].innerHTML=tou[0];
					}
				}
			}
		}
	}
}
function MakeDepMore(upset){
	let indiceSelectedDep = GetIndiceDepAdmin()[0];
	let colorfill="";
	for(let j=0;j<Bandes.length;++j){(Bandes[j][0]==cBande)?colorfill=Bandes[j][1]:""}
	for(let i=0;i<all_dep_xml_element.length;++i){
		if(upset>0){
			let col = liste_dep_prop[i][3];
			col=convertRgbToHex(moreTransparent(convertHexToRgb(col),50));
			all_dep_xml_element[i].setAttribute("fill",col);
			let c = convertRgbToHex(invertColor(convertHexToRgb(col)));
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
			for(let j=0;j<selected_departement_admin.length;++j){
				if(selected_departement_admin[j][0]==i && cBande==""){
					let z = ConvertIdLtoIdddb(selected_departement_admin[j][1]);
					let col = Bandes[z][1];
					col=convertRgbToHex(moreTransparent(convertHexToRgb(col),120));
					all_dep_xml_element[i].setAttribute("fill",col);
					let c = convertRgbToHex(invertColor(convertHexToRgb(col)));
					all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
				}
				else if(selected_departement_admin[j][0]==i && cBande!=""){
					if(indiceSelectedDep.indexOf(i)!=-1){
						all_dep_xml_element[i].setAttribute("fill",colorfill);
						let c = convertRgbToHex(invertColor(convertHexToRgb(colorfill)));
						all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
					}
					else{
						let z = ConvertIdLtoIdddb(selected_departement_admin[j][1]);
						let col = Bandes[z][1];
						col=convertRgbToHex(moreTransparent(convertHexToRgb(col),120));
						all_dep_xml_element[i].setAttribute("fill",col);
						let c = convertRgbToHex(invertColor(convertHexToRgb(col)));
						all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
					}
				}
			}
		}else{
			let col =liste_dep_prop[i][3];
			col=convertRgbToHex(moreTransparent(convertHexToRgb(col),0));
			all_dep_xml_element[i].setAttribute("fill",col);
			let c = convertRgbToHex(invertColor(convertHexToRgb(col)));
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill",c);
		}
	}
}
function convertHexToRgb(h){
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
	return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]||null;
}
function convertRgbToHex(c) {
	return "#" + componentToHex(c[0]) + componentToHex(c[1]) + componentToHex(c[2]);
}
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}
function invertColor(c){
	c = c.map(a=>(a>255)?255:a);
	return [(255 - c[0]), (255 - c[1]), (255 - c[2])];
}
function moreTransparent(c,u){
	return c.map(a=>(a+u>255)?255: parseInt(a+u));
}
async function ClearSelectedDep(){
	for(let i=0;i<selected_departement_user.length;++i) all_dep_xml_element[selected_departement_user[i]].setAttribute("fill",liste_dep_prop[selected_departement_user[i]][3]);
	for(let i=0;i<selected_departement_user.length;++i) all_dep_name_xml_element[ConvertItoJ(selected_departement_user[i])].setAttribute("fill","#000");
	selected_departement_user=await getUser();
}
ConvertItoJ = (i) => liste_dep_prop[i][5];
function ConvertJtoI(j){
	for(let k=0;k<liste_dep_prop.length;++k)if(liste_dep_prop[k][1]==all_dep_name_element[j]){ return liste_dep_prop[k][4];}
}
function SelectDep(n=1){
	for(let i=0;i<all_dep_xml_element.length;++i)(all_dep_xml_element[i].id.toString().split("_")[1]!="Reg")? all_dep_xml_element[i].addEventListener("click", function(){DepSelectedByuser(n,i);}):"";
	for(let j=0;j<all_dep_name_element.length;++j)all_dep_name_xml_element[j].addEventListener("click", function(){DepSelectedByuser(n,ConvertJtoI(j));});
}
async function DispDepSelecedUser(){
	if(selected_departement_user.length>0 && user=="User"){
		selected_departement_user=await getUser();
		let i = selected_departement_user[0];
		all_dep_xml_element[i].setAttribute("fill","#000000");
		all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","yellow");
		DisplayDepChoose();
	}
}
