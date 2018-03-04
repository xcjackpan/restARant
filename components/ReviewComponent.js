import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class ReviewComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.overall}>
				<Text style={styles.name}> {this.props.author_name} </Text>
				<Text style={styles.text}> {this.props.text} </Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	overall:{
		borderRadius: 20,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		//marginBottom: 10,
		backgroundColor: "#fcfdff",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 15,
		paddingRight: 15,
	},
  name:{
		color: "#1b3324",
		fontSize: 15,
		fontWeight: 'bold',
	},
	text:{
		color: "#1b3324",
		paddingTop: 10,
		fontSize: 15,
	},
});
