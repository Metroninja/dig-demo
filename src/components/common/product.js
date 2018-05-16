import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
  import { withNavigation } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addNote } from '../../actions/products';
import globalStyle from '../../styles';

@withNavigation
@connect(
  state => ({
  }),
  dispatch => bindActionCreators({ addNote }, dispatch)
)
export default class Product extends Component {

  static propTypes = {
    addNote: PropTypes.func,
    product: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  productSelected(id) {
    this.props.navigation.navigate('Details', {id});
  }

  render() {
    const { product } = this.props;
    // we slice to ensure we don't mutate the products.
    const thumbnail = product.images.slice(0,1).pop().thumb;
    /*** 
     * note image urls come in as http which will cause issues as the ios simulator blocks unauthenticated traffic
     * if https isn't an otpion you typically would setup an NSExceptionDomains list in the info.plist file
     * that said, you can't guarentee urls from an external source thus a simple replace in the view
     ***/
    // a
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.productSelected(product.id)}>
          <View style={styles.thumbnail}>
            <Image style={styles.image} source={{uri: thumbnail.replace('http', 'https')}} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={[styles.text, styles.price]}>${product.price}</Text>
          </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    ...globalStyle.row,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    ...globalStyle.title,
  },
  text: globalStyle.text,
  price: {
    color: globalStyle.waterBlue
  },
  thumbnail: {
    marginRight: 8,
    ...globalStyle.shadow,
  },
  image: {
    height: 75,
    width: 75,
    resizeMode: 'contain',
  }
});
