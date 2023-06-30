import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../backgrounds/back1.png')}
        //resizeMode="repeat"
        style={styles.background}
      >
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})