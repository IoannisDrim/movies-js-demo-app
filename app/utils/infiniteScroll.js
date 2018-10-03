class InfiniteScroll {

	constructor(caller, scrollID) {
		this.caller = caller;
		this.pageLoaded = 1;
		this.scrollContainer = document.getElementById(scrollID);
		this.addScrollEventListener();
	}

	/*Hears on scroll event and informs caller throufh event emit, to fetch more data if user scrolled to the end of page*/
	addScrollEventListener() {

		let fetchScrollContainerDataEvent = new Event('fetchScrollContainerData');

		this.scrollContainer.addEventListener('scroll', function() {
			if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight >= this.scrollContainer.scrollHeight) {
				this.pageLoaded++;
				document.dispatchEvent(new CustomEvent('fetchScrollContainerData_' + this.caller, {detail:{page:this.pageLoaded}}));
			}
		}.bind(this));
	}

}

export default InfiniteScroll;