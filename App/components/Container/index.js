/* @flow */

import React, { Element } from 'react'
import { View } from 'react-native'
import styles from './styles'



const Container = (props: Props) => {
  const { children } = props
  return (
    <View style={styles.container}>{children}</View>
  )
}

Container.Props = {
  children: Element,
}
export default Container
