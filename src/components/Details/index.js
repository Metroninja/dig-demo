import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, ScrollView, StyleSheet, 
  Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Comments from './comments';
import { Gallery } from './gallery';
import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list,
  }),
)
export default class Details extends Component {

  static propTypes = {
    addComment: PropTypes.func,
    products: PropTypes.array,
  };

  static navigationOptions = {
    title: 'Product Details'
  }

  constructor(props) {
    super(props);
    const id = props.navigation.state.params && props.navigation.state.params.id;
    this.state = {
      id,
      modalVisible: false,
    }
  }

  render() {
    /***
     * The majority of this is just rendering the text, it offloads the heavy lifting to the gallery and 
     * comments components.  Since this is a root page the Modal logic lives here, and it's simple enough
     * given the product scope to have it here versus as a peer to your router logic and wiring it up to
     * Redux which would be the normal route. 
     * Note Displaying the images large version in the requirments in the page didn't feel like a great
     * user experience so I used the thumbnails as clickable objects to then show the full verison.
     ***/
    const { id } = this.state;
    const product = this.props.products.find(p => p.id === id );
    const modalContent = !!this.state.modalContent && this.state.modalContent.replace('http', 'https');
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={[styles.text, styles.price]}>${product.price}</Text>
          <Text style={[styles.text, styles.header]}>Description:</Text>
          <Text style={styles.text}>{product.description}</Text>
          <Text style={[styles.text, styles.header]}>Specifications:</Text>
          <Text style={[styles.text, styles.specification]}>{product.specification}</Text>
        </View>
        <Gallery product={product} onImagePress={(modalContent) => this.setState({modalContent})} />
        <Comments id={id} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!modalContent}>
          <View style={styles.modal}>
            {!!modalContent && (<Image style={styles.originalImage} source={{uri: modalContent}} />)}
            <TouchableHighlight style={styles.close} onPress={() => this.setState({modalContent: ''})}>
              <Text style={styles.closeText}>X</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 8,
  },
  title: {
    ...globalStyle.title,
    marginBottom: 8,
  },
  header: {
    color: globalStyle.darkGray,
    marginBottom: 4,
    marginTop: 12,
  },
  text: globalStyle.text,
  price: {
    color: globalStyle.waterBlue,
  }, 
  specification: {
    fontStyle: 'italic'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  originalImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    resizeMode: 'contain'
  },
  close: {
    position: 'absolute',
    top: 22,
    right: 24,
  },
  closeText: {
    fontSize: 24,
    color: '#FFF'
  },
});
