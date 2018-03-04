import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import ReviewComponent from '../components/ReviewComponent';

export default class ReviewsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviews : []
    }
  }

  componentDidMount() {
    let things = [];
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.location.place_id}&key=AIzaSyAZzA8yZIoWx9sy-3DrN-J0fT2UoHjQm2Y`).then(data => {
      data.json().then(moreData => {
        // console.log(moreData.result.reviews);
        this.setState({
          reviews: moreData.result.reviews
        })
      });
    });
  }

  render(){
     console.log("AHHHHHHHHSADSADASHDSA");
     console.log(this.props.location);
      return(
        <View style={styles.overall}>
          <View style={styles.header}>
            <Text style={styles.restName}> {this.props.location.name} </Text>
            <Text style={styles.rating}> {this.props.location.rating} / 5</Text>
          </View>
          <ScrollView style={styles.container}>
          { this.state.reviews && this.state.reviews.map(data => {
          return (

              <ReviewComponent
                key={data.text}
                author_name={data.author_name}
                text={data.text}
              />
            )
          })
        }
        </ScrollView>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 5,
  },
  overall:{
    paddingBottom: 15,
    backgroundColor: "#d9e1e2",
    flex: 1,
  },
  header:{
    paddingLeft: 50,
    paddingRight: 10,
    paddingTop: 25,
    backgroundColor: "#16c3e5",
  },
  restName:{
    color: "#eee",
    fontSize: 30,
    // fontWeight: 'bold',
  },
  rating:{
    fontSize: 20,
    color: '#eee',
    paddingBottom: 10,
  },
});
