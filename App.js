import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long: null,
      lati: null,
      accuracy: null
    };
  }
  componentDidMount() {

      this.getLocation();

  }
  success = (pos) => {
    let crd = pos.coords;
    this.setState({
      long: crd.longitude,
      lati:  crd.latitude,
      accuracy: crd.accuracy
    })
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };


  getLocation = () => {
    // console.log("hello");
    var options = {
      enableHighAccuracy: false,
      timeout: 2500,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  render() {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lati},${this.state.long}&radius=1000&type=restaurant&key=AIzaSyAwOuyZGCccmqlcffWqoFaLkKbfvqSOVWU`).then(response => {
      response.json().then(responseJson => {
        console.log(Object.values(responseJson));
      });
    });

    return (
      <View style={styles.container}>
      <Text> {this.state.lati} </Text>
            <Text> {this.state.long} </Text>
                  <Text> {this.state.accuracy} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
