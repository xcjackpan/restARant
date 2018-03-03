import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class ReviewComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text> {this.props.author} </Text>
				<Text> {this.props.time} </Text>
				<Text> {this.props.rating}/5 </Text>
				<Text> {this.props.comment} </Text>
			</View>
		)
	}

}