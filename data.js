function Ajax(methode,url,contenttype,datasend,state=true,minetype=null){
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(methode,url,state);
		xhr.setRequestHeader("Content-Type",contenttype);
		(minetype)?xhr.overrideMimeType(minetype):"";
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
		xhr.send(datasend||null);
	});
}
