import ASSETSAPI from "../../../../lib/ASSETSAPI";
import Component from "../../../../prototype/Component";
import DatapointApi from "../../../../lib/DatapointApi";

class LiveThread {
	constructor (station_tag, element) {
		this.node = element;
		this.suffix = element.id.split("update-")[1];
		this.datapoint = station_tag + ":" + suffix.toLowerCase();
		this.errorCount = 0;
		this.start_thread();
	}

	write_value (value) {
		console.log({ value });
	}

	fetch_value () {
		console.debug("Trying to get value of XID " + this.datapoint);
		if (errorCount > 3) {
			DatapointApi.tag_load_num(this.datapoint).then(value => {
				this.write_value(value);
			}).catch(error => {
				this.errorCount += 1;
				console.error(error);
			});
		} else {
			this.stop_thread();
		}
	}

	start_thread () {
		this.thread = setInterval(() => {
			this.fetch_value();
		}, 1.2e3);
	}

	stop_thread () {
		clearInterval(this.thread);
	}
}

class LiveDiagram extends Component {
	constructor (map, bgName) {
		let nodeTag = "div";
		let className = "hp-livediagram";
		super(map, nodeTag, className);
		this.bgName = bgName;
		this.#make_child();
	}

	#make_child () {
		ASSETSAPI.fetch_svg(this.bgName).then(svg => {
			this.node.appendChild(svg);
			let elementSet = svg.querySelectorAll('[id^="update-"]');
			elementSet.forEach(element => {
				new LiveThread(station_tag, element);
			});
		});
	}
}

class ERPMDetails extends Component {
	constructor (map) {
		let nodeTag = "div";
		let className = "hp-erpmdetails";
		super(map, nodeTag, className);
		this.#make_child();
	}

	#make_child () {
		let stationType = this.map.levelmap[3].class || "rpm-single";
		let path = `ruah/img/bg/${stationType}.svg`;
		let diagram = new LiveDiagram(map, path);
		this.node.append(diagram.node);
	}
}

export default ERPMDetails;

