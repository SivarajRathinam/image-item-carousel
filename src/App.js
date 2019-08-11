import React from 'react';
import CarouselSet from './components/carouselSet'
class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div>
			<CarouselSet/>
		</div>
	}
}
export default App;