import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class MarkerComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let minLeft = 21471483647;
		let maxRight = -21471483648;
		let minTop = 21471483647;
		let maxBottom = -21471483648;

		{this.prop.INPUTARRAY}.map(data => {
			data.boundingBox.map(elem => {
				minLeft = Integer.min(minLeft, elem.x);
				maxRight = Integer.max(maxRight, elem.x);
				minTop = Integer.min(minTop, elem.y);
				maxBottom = Integer.max(maxBottom, elem.y);
			});
		});

		return (
			<View style={styles.marker}>
				<Text style={styles.rating}> {this.props.rating}/5 </Text>
			</View>
		)
	}

}

const styles = StyleSheet.create({
  marker: {
  	position: 'absolute';
  	top: {maxBottom + 40};
  	left: {(minLeft + maxRight) / 2 - 10};
  	width: 20;
  	height: 20;
  	backgroundColor: '#216F90';
  	borderRadius: 2;
  },
  rating: {
  	color: "#fff";
  },
});

