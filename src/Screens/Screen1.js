import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { REST_STATUS } from '../utils/constants'
import COLORS from '../utils/colors';
import { fetchStockPrices } from '../actions/actions';
import Calendar from '../components/Calendar';
import Graph from '../components/Graph';

class Screen1 extends PureComponent {
    constructor(props) {
        super(props);
        this.loadData();
    }

    loadData() {
        this.props.dispatch(fetchStockPrices());
    }

    render() {
        const { data, dispatch, navigation, status } =  this.props;
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.BLUE_GREY_800, paddingVertical: 10 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <Calendar data={data} dispatch={dispatch} navigation={navigation} />
                    <Graph data={data} loading={status !== REST_STATUS.SUCCESS} />
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(reduxStore) {
    return reduxStore.calendar;
}

export default connect(
    mapStateToProps,
    null,
)(Screen1);