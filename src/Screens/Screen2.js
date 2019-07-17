// @flow
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

type Props = {
    navigation: {
        navigate: () => void;
    },
};
export default class Screen2 extends PureComponent<Props> {
    navigateToScreen1 =() => this.props.navigation.navigate('Screen1');
    
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.navigateToScreen1}>
                    <Text>
                        GO to Screen2
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}