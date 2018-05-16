import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';

import globalStyle from '../../styles';

/*** 
 * stateless Gallery component handles rendering of images, and pass the image selected event
* sending it up to the parent
***/
export const Gallery = ({onImagePress, product}) => (
  <View style={styles.gallery}>
    {product.images.map((img, index) => (
      <TouchableOpacity 
        style={styles.thumbnail} 
        onPress={() => onImagePress(img.original)} 
        key={index}
      >
        <Image style={styles.image} source={{uri: img.thumb.replace('http', 'https')}} />
      </TouchableOpacity>
    ))}
</View>
)

const styles = StyleSheet.create({
  gallery: {
    marginVertical: 24,
    ...globalStyle.row,
    justifyContent: 'center',
    paddingHorizontal: 8,
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
});
