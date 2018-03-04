import React, {Component} from 'react';
import { Text, View, ScrollView} from 'react-native';
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
        console.log(moreData.result.reviews);
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
        <View>
          <Text> {this.props.location.name} </Text>
          <Text> {this.props.location.rating} </Text>
          { this.state.reviews && this.state.reviews.map(data => {
          return (<ReviewComponent
            key={data.text}
             author_name={data.author_name}
             text={data.text}

          />)
        })
        }
        </View>
      )
  }
}
