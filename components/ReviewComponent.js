import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ReviewComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text> {this.props.author_name} </Text>
				<Text> {this.props.text} </Text>
			</View>
		);
	}

}