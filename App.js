import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
import { Camera, Permissions } from 'expo';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long: null,
      lati: null,
      accuracy: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,  
    };
  }
  componentDidMount() {

      // this.getLocation();

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

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  getLocation = () => {
    // console.log("hello");
    var options = {
      enableHighAccuracy: false,
      timeout: 2500,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  snap = async() => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({base64:true}).then(data => {
        // console.log(data);
        // NativeModules.RNImageToBase64.getBase64String(data.uri, async(err, base64) => {
          this.checkForLabels(data.base64).then(data => {
            data.responses[0].textAnnotations.map(a => {
              console.log(a.description);
            });
            console.log("LOGO");
            data.responses[0].logoAnnotations.map(a => {
              console.log(a.description);
            });
          });
          // console.log(result);
        // });
        // this.checkForLabels()
      });
    }
  }

  checkForLabels = async(base64) => {
      console.log("Checking for text...");
      return await
          fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZzA8yZIoWx9sy-3DrN-J0fT2UoHjQm2Y', {
              method: 'POST',
              body: JSON.stringify({
                  "requests": [
                      {
                          "image": {
                              "content": base64
                          },
                          "features": [
                              {
                                  "type": "TEXT_DETECTION"
                              },
                              {
                                  "type":"LOGO_DETECTION"
                              }
                          ]
                      }
                  ]
              })
          }).then((response) => {
              return response.json();
          }, (err) => {
              console.error('promise rejected')
              console.error(err)
          });
  }

  render() {
    // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lati},${this.state.long}&radius=1000&type=restaurant&key=AIzaSyAwOuyZGCccmqlcffWqoFaLkKbfvqSOVWU`).then(response => {
    //   response.json().then(responseJson => {
    //     console.log(Object.values(responseJson));
    //   });
    // });

      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
    }
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