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
		let x = text[i].getAttribute("x"),y = text[i].getAttribute("y");
		c=r*x,
		d=r*y;
		text[i].setAttribute("x",c);
		text[i].setAttribute("y",d);
	}
	for(let i=0;i<tspan.length;++i){
		let x = tspan[i].getAttribute("x"),y = tspan[i].getAttribute("y");
		c=r*x,
		d=r*y,
		tspan[i].setAttribute("x",c);
		tspan[i].setAttribute("y",d);
	}
	for(let i=0;i<rect.length;++i){
		let x = rect[i].getAttribute("x"),y = rect[i].getAttribute("y"),wr = rect[i].getAttribute("width"),hr = rect[i].getAttribute("height");
		c=r*x,
		d=r*y;
		e=r*wr,
		f=r*hr;
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
			//~ fill = all_dep_xml_element[i].getAttribute("fill"),
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
		console.log(fill,current_fill);
		if(current_fill==fill && current_n<num_dep_select){
			all_dep_xml_element[i].setAttribute("fill","#000000");
			selected_departement_user.push(liste_dep_prop[i][4]);
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","yellow");
		}
		else if(current_fill==fill && current_n==num_dep_select){
			let a = selected_departement_user.pop();
			all_dep_xml_element[a].setAttribute("fill",liste_dep_prop[a][3]);
			all_dep_name_xml_element[ConvertItoJ(a)].setAttribute("fill",convertRgbToHex(invertColor(convertHexToRgb(liste_dep_prop[a][3]))));
			all_dep_xml_element[i].setAttribute("fill","#000000");
			all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","yellow");
			selected_departement_user.push(liste_dep_prop[i][4]);
		}
		else if(current_fill!=fill){
			let a = selected_departement_user.indexOf(i);
			let ii = selected_departement_user[a];
			all_dep_xml_element[ii].setAttribute("fill",liste_dep_prop[ii][3]);
			all_dep_name_xml_element[ConvertItoJ(ii)].setAttribute("fill",convertRgbToHex(invertColor(convertHexToRgb(liste_dep_prop[ii][3]))));
			selected_departement_user.splice(a,1);
		}
		DisplayDepChoose();
	}else if(user="Admin"){DepMultipleSelectedByuser(num_dep_select,i);}
}
function DisplayDepChoose(){
	let a=liste_dep_prop[selected_departement_user[0]];
	document.getElementById("depuserchoose").innerHTML=(a)?a[2]+" - "+a[1]:"";
}
function GetIndiceDepAdmin(){
	indiceSelectedDep = [],b=[];
	for(let i=0;i<selected_departement_admin.length;++i){
		for(let j=0;j<Bandes.length;++j){
			if(selected_departement_admin[i][1]==j && Bandes[j][0]==cBande){
				indiceSelectedDep.push(selected_departement_admin[i][0]);
				b.push(selected_departement_admin[i][1]);
			}
		}
	}
	return [indiceSelectedDep,b];
}			
function DepMultipleSelectedByuser(num_dep_select,i){
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
		selected_departement_admin.push([liste_dep_prop[i][4],w]);
	}
	else{
		for(let k=0;k<selected_departement_admin.length;++k){
			if(selected_departement_admin[k][0]==i){
				all_dep_xml_element[i].setAttribute("fill",liste_dep_prop[i][3]);
				all_dep_name_xml_element[ConvertItoJ(i)].setAttribute("fill","#000");
				selected_departement_admin.splice(k,1);
			}
		}
	}
	DisplayDepBandes();
}
function DisplayDepBandes(){
	let text = "";
	text+="<table>";
	text+="<tr>";
	let a=[],b=[],m=0;
	for(let i=0;i<Bandes.length;++i){
		a=[];
		for(let j=0;j<selected_departement_admin.length;++j){
			(selected_departement_admin[j][1]==i)?a.push(selected_departement_admin[j][0]):"";
		}
		m=(m<a.length)?a.length:m;
		b.push(a);
	}
	for(let i=0;i<Bandes.length;++i){
		text+="<th>"+Bandes[i][0]+" ("+b[i].length+")</th>";
	}
	text+="</tr>";
	for(let k=0;k<m;++k){
		text+="<tr>";
		for(let i=0;i<Bandes.length;++i){
			text+=(b[i][k])?"<td>"+liste_dep_prop[b[i][k]][2] + " - "+liste_dep_prop[b[i][k]][1]+"</td>":"<td></td>";
		}
		text+="</tr>";
	}
	text+="</table>";
	document.getElementById("tabledepbandes").innerHTML=text;
}
function ChoiceUsers(){
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
	
	document.getElementById("typeselection").onchange = function (){
		j=document.querySelector("input[type=radio][name=sr]:checked").getAttribute("value");
		user=j;
		ClearSelectedDep();
		DisplayDepBandes();
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
	for(let i=0;i<Bandes.length;++i){
		let a=(cBande==Bandes[i][0])?"checked":"";
		text+="<span style=\"color:"+Bandes[i][1]+"\">"+Bandes[i][0]+" </span><span id=\"deleteB_"+i+"\">×</span> : <input type=\"radio\" "+a+" name=\"cdb\" id=\"ts\" value=\""+Bandes[i][0]+"\"/>";
	}
	text+=" <span id=\"ajoutBande\">+ Ajouter une bande </span>";
	document.getElementById("cdbdiv").innerHTML="<p>Bandes: "+text+"</p>";
	document.getElementById("ajoutBande").addEventListener("click", (e)=>AjoutBande(),{once:true});
	let divDelete = document.querySelectorAll("[id^='deleteB_']");
	for(let i=0;i<divDelete.length;++i){
		divDelete[i].addEventListener("click", (e)=>SpprBande(divDelete[i].id),{once:true});
	}
	DepMapChange();
	document.getElementById("cdbdiv").onchange = function(){ 
		cBande=(document.querySelector("input[type=radio][name=cdb]:checked"))?document.querySelector("input[type=radio][name=cdb]:checked").getAttribute("value"):"";
		DepMapChange();
	};
}
function AjoutBande(){
	document.getElementById("ajoutBande").innerHTML="<input type=\"text\" id=\"AjouBandeInput\" placeholder=\"Nom\" col=3 row=1/><span id=\"crossInput\">×</span>";
	document.getElementById("ajoutBande").addEventListener("keyup", function onEvent(e) {
		if (e.keyCode === 13) {
			Bandes.push([document.getElementById("AjouBandeInput").value,MakeColor()]);
			ChoiceAdminBande();
		}
	});
	document.getElementById("crossInput").addEventListener("click", (e)=>ChoiceAdminBande());
}
function MakeColor(){
	let upset = 150, r = Math.floor(Math.random()*upset),g = Math.floor(Math.random()*upset),b = Math.floor(Math.random()*255);
	return convertRgbToHex([r,g,b]);
}
function SpprBande(id){
	let a=[];
	for(let i=selected_departement_admin.length-1;i>-1;--i){
		console.log(selected_departement_admin,i);
		if(selected_departement_admin[i][1]>Number(id.split("_")[1])){
			selected_departement_admin[i][1]=selected_departement_admin[i][1]-1;
		}else if(selected_departement_admin[i][1]==Number(id.split("_")[1])){
			selected_departement_admin.splice(i,1);
		}
		console.log(selected_departement_admin[i]);
	}
	Bandes.splice(Number(id.split("_")[1]),1);
	console.log(selected_departement_admin);
	ChoiceAdminBande();
}
function DepMapChange(){
	DisplayDepBandes();
	MakeDepMore(-1);
	MakeDepMore(1);
}
function MakeDepMore(upset,u=0){
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
					let col = Bandes[selected_departement_admin[j][1]][1];
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
						let col = Bandes[selected_departement_admin[j][1]][1];
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
function ClearSelectedDep(){
	for(let i=0;i<selected_departement_user.length;++i) all_dep_xml_element[selected_departement_user[i]].setAttribute("fill",liste_dep_prop[selected_departement_user[i]][3]);
	for(let i=0;i<selected_departement_user.length;++i) all_dep_name_xml_element[ConvertItoJ(selected_departement_user[i])].setAttribute("fill","#000");
	selected_departement_user=[];
}
ConvertItoJ = (i) => liste_dep_prop[i][5];
function ConvertJtoI(j){
	for(let k=0;k<liste_dep_prop.length;++k)if(liste_dep_prop[k][1]==all_dep_name_element[j]){ return liste_dep_prop[k][4];}
}
function SelectDep(n=1){
	for(let i=0;i<all_dep_xml_element.length;++i)(all_dep_xml_element[i].id.toString().split("_")[1]!="Reg")? all_dep_xml_element[i].addEventListener("click", function(){DepSelectedByuser(n,i);}):"";
	for(let j=0;j<all_dep_name_element.length;++j)all_dep_name_xml_element[j].addEventListener("click", function(){DepSelectedByuser(n,ConvertJtoI(j));});
}
