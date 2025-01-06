import Component from './Component.js';
import DatapointApi from '../lib/DatapointApi.js';

class StatefulComponent extends Component {
	constructor (datapoint, className = "StatefulComponent") {
		let map = null;
		let nodeTag = 'td';
		super (map, nodeTag, className);
		this.datapoint = datapoint;
	}

	fetch_value () {
		DatapointApi.load_tag_num(this.datapoint).then(value => {
			this.update_value(value);
		});
	}

	get_address () {
		return this.address;
	}

	update_value (value) {
		this.node.innerText = value;
	}
}

export default StatefulComponent;
