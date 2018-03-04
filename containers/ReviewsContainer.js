import React, {Component} from 'react';
import { Test, View, ScrollView} from 'react-native';

export default class ReviewsContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
        <ScrollView>
          <Text> {this.props.restaurantName}</Text>
          <Text> {this.props.overallRating}/5</Text>
        </ScrollView>
      )
  }
}
