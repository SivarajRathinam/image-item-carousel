import React from 'react';
import axios from 'axios';
import Carousel from './carousel';
import '../style/carousel.css'

class CarouselSet extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			'albums':[]
		}
	}
	componentDidMount(){
		axios.get('https://jsonplaceholder.typicode.com/albums')
			.then(res => {
		        const albums = res.data;
		        this.setState({ albums });
		      })
	}
	loadCarosel(){
		return this.state.albums.map((album)=>{
			return <Carousel album={album} key={album['id']} />
		})
	}
	render(){
		return (<div>
				{this.loadCarosel()}
		</div>)
	}

}
export default CarouselSet

