class ComponentLoader {

	constructor(appComponents, pageID) {
		this.pageID = pageID;
		this.appComponents = appComponents;
		this.componentsToLoad = [];
		this.controller = '';
	}

	/*Finds all 'component-to-load' attributes in page loaded*/
	loadComponents() {
		let componentHolders = document.getElementById(this.pageID).querySelectorAll('[component-to-load]');
		let componentsToLoad = [];

		componentHolders.forEach(function(holder){
			let componentObj = {
				holder: holder,
				name: holder.getAttribute('component-to-load')
			}
			this.componentsToLoad.push(componentObj);
		}.bind(this));
	}

	/*Fetches component's HTML and Data and places it in page*/
	loadComponentData(data) {
		this.componentsToLoad.forEach(function(component){
			this.includeHTML(component.name)
				.then(function(success){
					component.holder.innerHTML = success;
					this.controller = new this.appComponents[component.name].ctrl(this.appComponents, this.pageID, data);
				}.bind(this), function(){

				})
		}.bind(this));
	}

	/*Call for getting component's HTML*/
	includeHTML(component) {
		return $.get(this.appComponents[component].html);
	}
}

export default ComponentLoader;