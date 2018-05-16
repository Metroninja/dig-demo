import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, SafeViewArea, StyleSheet, 
  Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list,
    notes: state.products.notes,
  })
)
export default class Details extends Component {

  static propTypes = {
    products: PropTypes.array,
    notes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const id = props.navigation.state.params && props.navigation.state.params.id;
    this.state = {
      id,
      modalVisible: false,
    }
  }

  render() {
    const product = this.props.products.find(p => p.id === this.state.id);
    const modalContent = !!this.state.modalContent && this.state.modalContent.replace('http', 'https');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={[styles.text, styles.price]}>${product.price}</Text>
        <Text style={[styles.text, styles.header]}>Description:</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={[styles.text, styles.header]}>Specifications:</Text>
        <Text style={[styles.text, styles.specification]}>{product.specification}</Text>
        <View style={styles.gallery}>
          {product.images.map((img, index) => (
            <TouchableOpacity 
              style={styles.thumbnail} 
              onPress={() => this.setState({modalContent: img.original})} 
              key={index}
            >
              <Image style={styles.image} source={{uri: img.thumb.replace('http', 'https')}} />
            </TouchableOpacity>
          ))}
        </View>
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
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
  gallery: {
    marginTop: 24,
    ...globalStyle.row
  },
  thumbnail: {
    marginRight: 8,
    ...globalStyle.shadow,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
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
  }
});
