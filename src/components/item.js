import React from 'react';
import LazyLoad from 'react-lazyload';
import ImageLoader from './imageLoader'

class Item extends React.Component{
	constructor(props){
		super(props)
	}
	loadItem(){
		return <div className="carouselItem">
					<LazyLoad width={150} offset={100} once>
						<ImageLoader src={this.props.data.thumbnailUrl} />
					</LazyLoad>
					<span className="itemTitle">{this.props.data.title}</span>
					<span className="itemId">id: {this.props.data.id}</span>
				</div>
	}
	render(){
		return <>{this.loadItem()}</>
	}
}
export default Item