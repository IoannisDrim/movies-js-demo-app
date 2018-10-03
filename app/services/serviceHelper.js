const serviceHelper = function() {

	this.returnPromise = function(REST_Metod, serviceURL) {
		return new Promise((resolve, reject) => {
		    const xhr = new XMLHttpRequest();
		    xhr.open(REST_Metod, serviceURL);
		    xhr.onload = () => resolve(xhr.responseText);
		    xhr.onerror = () => reject(xhr.statusText);
		    xhr.send();
		});
	}

}
export default serviceHelper;