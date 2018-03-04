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
		marginLeft: 15,
		marginRight: 15,
	},
  name:{
		color: "#1b3324",
		paddingTop: 10,
		fontSize: 15,
		fontWeight: 'bold',
	},
	text:{
		paddingTop: 5,
		fontSize: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		borderStyle: 'solid',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 5,
	},
});
