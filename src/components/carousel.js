import React from 'react';
import axios from 'axios';
import Item from './item';
import { Swipeable,defineSwipe } from 'react-touch';

export default class Carousel extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			photos:[],
			isLoading:true,
			disableLeftArrow:true,
			childWidth:null
		}
		this.myRef = React.createRef();
	}
	componentDidMount(){
		let url = 'https://jsonplaceholder.typicode.com/photos?albumId='+this.props.album.id
		axios.get(url)
			.then(res=>{
				const photos = res.data
				this.setState({photos,isLoading:false})
			})
	}
	handleScrollLeft(){
		let child_width = this.state.childWidth
		if (child_width == null){
			child_width = this.myRef.current.children[0].offsetWidth
			this.setState({childWidth:child_width})
		}
		this.myRef.current.scrollBy(-(child_width),0)
		if(this.myRef.current.scrollLeft == 0)
			this.setState({disableLeftArrow:true})
	}
	handleScrollRight(){
		let child_width = this.state.childWidth
		if (child_width == null){
			child_width = this.myRef.current.children[0].offsetWidth
			this.setState({childWidth:child_width})
		}
		this.myRef.current.scrollBy(child_width,0)
		if(this.myRef.current.scrollLeft > 0)
			this.setState({disableLeftArrow:false})
	}
	loadCarouselItems(){
		return this.state.photos.map((photo)=>{
			return <Item data={photo} key={photo['id']}/>
		})
	}
	loadArrows(){
		if(this.state.disableLeftArrow){
			return <div className="carouselArrowContainer">
					<label className="carouselRightArrow" onClick={()=>{this.handleScrollRight()}}>&gt;</label>
				</div>
		}
		return (<div className="carouselArrowContainer">
					<label className="carouselLeftArrow" onClick={()=>{this.handleScrollLeft()}}>&lt;</label>
					<label className="carouselRightArrow" onClick={()=>{this.handleScrollRight()}}>&gt;</label>
				</div>)
	}
	render(){
		const swipe = defineSwipe({swipeDistance: 50});
		if (this.state.isLoading){
			return <div className="carouselContainer" style={{position:'relative'}}>
						<div className="mainloadingContainer">
							<div className="loader"></div>
						</div>
					</div>
		}
		return (<Swipeable config={swipe} onSwipeLeft={this.handleScrollRight.bind(this)} onSwipeRight={this.handleScrollLeft.bind(this)}>
						<div className="carouselContainer carouselShadow">
					<div className="carouselHeader">
						<div className="carouselTitle">{this.props.album.title}</div>
						<div className="carouselSubTitle"><span>id: {this.props.album.id}</span>
							<span>userid: {this.props.album.userId}</span>
						</div>
					</div>
				<div className="carousel" ref={this.myRef}>
					{this.loadCarouselItems()}
				</div>
				{this.loadArrows()}
			</div>
			</Swipeable>)
	}
}