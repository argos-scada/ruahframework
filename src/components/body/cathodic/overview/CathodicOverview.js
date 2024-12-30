import Component from '../../../../prototype/Component.js';
import CathodicSummary from './CathodicSummary.js';

class CathodicOverview extends Component {
	constructor (map) {
		let nodeTag = "div";
		let className = "hp-cathodicoverview";
		super(map, nodeTag, className);
		this.#make_child();
	}

	#make_child () {
		let overview_children = this.map.levelmap[1].children;
		let overview_entries = Object.entries(overview_children);
		let summary = new CathodicSummary(overview_entries, this.map);
		this.node.appendChild(summary.node);
	}
}

export default CathodicOverview;

