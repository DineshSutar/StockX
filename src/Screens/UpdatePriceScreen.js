import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import COLORS from '../utils/colors';
import { updateStockPrice } from '../actions/actions';
import { REST_STATUS } from '../utils/constants';


class UpdatePriceScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            price: this.getInitialPrice(),
        }
    }

    goBack = () => this.props.navigation.goBack();

    componentDidUpdate(prevProps) {
        if (
            this.props.updatePriceStatus === REST_STATUS.SUCCESS
            && prevProps.updatePriceStatus !== this.props.updatePriceStatus
        ) {
            Alert.alert(
                '',
                'Price Updated Successfully',
                [{
                    text: 'Go to HomeScreen',
                    onPress: this.goBack,
                }],
                {
                    cancelable: false,
                }
            )
        }
    }

    getInitialPrice() {
        const { value } = this.props.navigation.state.params.data;
        return value ? `${value.fields.Amount}` : '';
    }

    onChangePrice = price => {
        const onlyNumbers = /^[0-9]*$/;
        if (onlyNumbers.test(price)) {
            this.setState({ price });
        } else {
            Alert.alert('', 'Please enter value containing only digits i.e. 0 - 9');
        }
        
    }

    onPressSubmit = () => {
        const { date, value } = this.props.navigation.state.params.data;
        this.props.dispatch(updateStockPrice(date, Number(this.state.price), (value && value.id)));
    }

    renderHeader() {
        const { date } = this.props.navigation.state.params.data;
        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: COLORS.TRANSPARENT,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginVertical: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.BLUE_GREY_300,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 100,
                    }}
                    onPress={this.goBack}
                >
                    <Text style={{ color: COLORS.BLUE_GREY_700, fontWeight: 'bold' }}>
                        {`<  Back`}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: COLORS.BLUE_GREY_100,
                        
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 100, 
                    }}
                >
                    <Text style={{ color: COLORS.BLUE_GREY_700, fontWeight: 'bold', fontSize: 14 }}>
                        {moment(date).format('Do MMM, YYYY')}
                    </Text>
                </View>
            </View>
        );
    }

    renderPriceInput() {
        return (
            <View
                style={{
                    backgroundColor: COLORS.BLUE_GREY_200,
                    borderRadius: 15,
                    marginVertical: 10,
                    padding: 15,
                }}
            >
                <Text style={{ fontWeight: 'bold', color: COLORS.BLUE_GREY_700 }}>
                    Price
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'  }}>
                    <Text style={{ fontWeight: 'bold', color: COLORS.BLUE_GREY_700}}>₹</Text>
                    <TextInput
                        autoFocus
                        placeholder="eg: 3000"
                        placeholderTextColor={COLORS.BLUE_GREY_400}
                        underlineColorAndroid={COLORS.BLUE_GREY_700}
                        maxLength={5}
                        style={{ width: '100%' }}
                        keyboardType="number-pad"
                        onChangeText={this.onChangePrice}
                        value={this.state.price}
                    />
                </View>
                
            </View>
        )
    }

    renderSubmitButton() {
        const { value } = this.props.navigation.state.params.data;
        const { price } = this.state;
        const isOriginalPrice = !!value && value.fields.Amount === Number(price);
        const isEmptyPrice = !price;
        const submitPending = this.props.updatePriceStatus === REST_STATUS.LOADING;
        const submitDisabled = isEmptyPrice || isOriginalPrice || submitPending;
        return (
            <TouchableOpacity
                onPress={this.onPressSubmit}
                disabled={submitDisabled}
                style={{
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    margin: 10,
                    borderRadius: 100,
                    backgroundColor: submitDisabled ? COLORS.BLUE_GREY_300 : COLORS.BLUE_GREY_200,
                }}
            >
                {submitPending
                    ? (<ActivityIndicator color={COLORS.BLUE_GREY_900} />)
                    : (
                        <Text
                            style={{
                                color: submitDisabled ? COLORS.BLUE_GREY_400 : COLORS.BLUE_GREY_900,
                                fontWeight: 'bold',
                            }}
                        >
                            {value ? 'Edit' : 'Add'}
                        </Text>
                    )
                }
            </TouchableOpacity>
        );
    }
    
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.BLUE_GREY_800, padding: 10, alignItems: 'center' }}>
                {this.renderHeader()}
                {this.renderPriceInput()}
                {this.renderSubmitButton()}
            </View>
        );
    }
}

function mapStateToProps(reduxStore) {
    return reduxStore.updatePrices;
}

export default connect(
    mapStateToProps, null,
)(UpdatePriceScreen);