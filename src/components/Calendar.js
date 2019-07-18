import React, { PureComponent } from 'react';
import {
    Alert,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';

import COLORS from '../utils/colors';
import { deleteStockPrice } from '../actions/actions';

export default class Calendar extends PureComponent {
    dateHeaderFormat(date) {
        return moment(date).format('D MMM');
    }

    formatedData() {
        let emptyEntries = [];
        for (let d = 0; d < moment().format('d'); d++) {
            emptyEntries.push({})
        }
        return [...emptyEntries, ...this.props.data];
    }

    removeStockPrices(id) {
        Alert.alert(
            'Confirm Delete',
            'The stock prices once deleted will no longer be available',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                },
                {
                    text: 'Ok',
                    onPress: () => this.props.dispatch(deleteStockPrice(id)),
                }
            ],
            { cancelable: false },
        )
    }

    renderDateItem = ({ item, index }) => {
        const width = 100/7;
        const { date, value } = item;
        return (
            <View
                style={{
                    width: `${width}%`,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 2,
                    paddingHorizontal: 1,
                    backgroundColor: '#00000000'
                }}
            >
                {!!date && (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: COLORS.BLUE_GREY_100,
                            borderRadius: 5,
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Screen2', { data: item })}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: COLORS.BLUE_GREY_700, fontWeight: 'bold' }}>
                            {moment(date).format('D')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.removeStockPrices(value.id)}
                        disabled={!value}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 20,
                            width: '100%',
                            backgroundColor: value ? COLORS.BLUE_GREY_200 : COLORS.TRANSPARENT,
                            borderRadius: 5, 
                            paddingHorizontal: 5,
                        }}
                    >   
                        {!!value ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text style={{ fontSize: 10, flex: 1, color: COLORS.BLUE_GREY_700 }}>
                                    {`₹ ${value.fields.Amount}`}
                                </Text>
                                <Text style={{ fontSize: 10, color: COLORS.BLUE_GREY_400 }}>x</Text>
                            </View>
                            ) : (
                                <Text style={{ color: COLORS.BLUE_GREY_400 }}> -- </Text>
                            )
                        }
                    </TouchableOpacity>
                    </View>
                )}
                
            </View>
        );
    }

    datesKeyExtractor =(item, index) => `${index}`;

    renderDates() {
        return (
            <FlatList
                data={this.formatedData()}
                renderItem={this.renderDateItem}
                numColumns={7}
                keyExtractor={this.datesKeyExtractor}
            />
        )
    }

    renderWeekdays() {
        const weekDaysShort = moment.weekdaysShort();
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingVertical: 5,
                    borderRadius: 50,
                    backgroundColor: COLORS.BLUE_GREY_200,
                }}
            >
                {weekDaysShort.map(day => (
                    <View key={day} style={{ flex: 1, backgroundColor: COLORS.lightBackground, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.BLUE_GREY_900}}>
                            {day}
                        </Text>
                    </View>
                ))}
            </View>
        );
    }
    
    renderCalenderCard() {
        return (
            <View
                style={{
                    flex: 1,
                    margin: 3,
                    paddingVertical: 15,
                    paddingHorizontal: 2,
                    backgroundColor: COLORS.BLUE_GREY_50,
                    borderRadius: 15,
                }}
            >
                {this.renderWeekdays()}
                {this.renderDates()}
            </View>
        );
    }

    renderHeader() {
        const { data } =  this.props;
        const startDate = this.dateHeaderFormat(data[0].date);
        const endDate = this.dateHeaderFormat(data[data.length - 1].date);
        const year = moment().format('YYYY');
        return (
            <View
                style={{
                    backgroundColor: COLORS.BLUE_GREY_100,
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 100, 
                }}
            >
                <Text style={{ color: COLORS.BLUE_GREY_700, fontWeight: 'bold', fontSize: 14 }}>
                   {startDate} - {endDate}, {year}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.TRANSPARENT, alignItems: 'center'}}>
                {this.renderHeader()}
                {this.renderCalenderCard()}
            </View>
        );
    }
}