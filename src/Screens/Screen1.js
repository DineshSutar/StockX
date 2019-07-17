// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

type Props = {
    navigation: {
        navigate: () => void;
    },
};
export default class Screen1 extends PureComponent<Props> {
    navigateToScreen2 =() => this.props.navigation.navigate('Screen2');
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.navigateToScreen2}>
                    <Text>
                        GO to Screen2
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}