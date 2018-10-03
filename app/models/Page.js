class Page {
	constructor(url, pageCtrl, appComponents) {
		this.url = url;
		this.pageCtrl = pageCtrl;
		this.appComponents = appComponents;
	}

	load() {
		return $.get(this.url).then(res => this.html = res);
	}  

	show(el) {
		el.innerHTML = this.html;
		if ( this.pageCtrl ) {
			new this.pageCtrl(this.appComponents);
		}
	}
}

export default Page;