import Component from './Component.js';
import DatapointApi from '../lib/DatapointApi.js';

class StatefulComponent extends Component {
	constructor (datapoint, className = "StatefulComponent") {
		let map = null;
		let nodeTag = 'td';
		super (map, nodeTag, className);
		this.datapoint = datapoint;
		this.errorCount = 0;
		this.start_loop();
	}

	fetch_value () {
		DatapointApi.tag_load_num(this.datapoint).then(value => {
			this.update_value(value);
		}).catch((error) => {
			this.errorCount += 1;
			console.error({ error, Component: this });
		});
	}

	get_address () {
		return this.address;
	}

	update_value (value) {
		this.node.innerText = value;
	}

	write_error () {
		this.update_value("\u274C");
	}

	start_loop () {
		this.loopPointer = setInterval(() => {
			if (this.errorCount > 3) {
				this.fetch_value();
			} else {
				this.stop_loop();
			}
		}, 5e3);
	}

	stop_loop () {
		clearInterval(this.loopPointer);
		this.write_error();
	}
}

export default StatefulComponent;

