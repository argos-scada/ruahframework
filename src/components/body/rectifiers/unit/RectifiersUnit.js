import Component from '../../../../prototype/Component.js';
import ASSETSAPI from '../../../../lib/ASSETSAPI.js';

class RectifiersUnit extends Component {
	constructor (map) {
		let nodeTag = "div";
		let className = "hp-rectifiersunit";
		super(map, nodeTag, className);
		this.#make_child();
	}

	#make_child () {
		let path = "ruah/img/bg/rectifiers.svg";
		ASSETSAPI.fetch_svg(path).then(svg => {
			this.node.appendChild(svg);
		});
	}
}

export default RectifiersUnit;

