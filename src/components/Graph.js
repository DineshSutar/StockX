import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';
import moment from 'moment';

export default class Graph extends PureComponent {
    getProfitData(data) {
        if (data.length > 1) {
            let maxPriceIndex;
            let minPriceIndex = 0;
            let maxProfitPerUnit = 0;
            data.forEach((record, index) => {
                if (record.price - data[minPriceIndex].price > maxProfitPerUnit) {
                    maxProfitPerUnit = record.price - data[minPriceIndex].price;
                    maxPriceIndex = index;
                } 
                if (record.price < data[minPriceIndex].price) {
                    minPriceIndex = index;
                }
            })
            const maxProfit = maxProfitPerUnit * 10;
            const sellingDate = data[maxPriceIndex].date;
            const buyingDate = minPriceIndex < maxPriceIndex
                ? data[minPriceIndex].date 
                : data.find((record, index) =>
                    ((data[maxPriceIndex].price - maxProfitPerUnit) === record.price && index < maxPriceIndex));
            return { maxProfit, sellingDate, buyingDate };
        }
        return { error: 'Insufficient data to calculate profit :(' };
    }

    textWrapper(text) {
        return (
            <Text
                style={{
                    backgroundColor: COLORS.BLUE_GREY_700,
                    color: COLORS.BLUE_GREY_100,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    margin: 5,
                    borderRadius: 100,
                }}
            >
                {text}
            </Text>
        );
    }

    renderDetails(data) {
        const { maxProfit, sellingDate, buyingDate, error } = this.getProfitData(data);
        if (error) {
            return this.textWrapper(error);
        }
        return (
            <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                {this.textWrapper(`Buy on: ${buyingDate}`)}
                {this.textWrapper(`Sell on: ${sellingDate}`)}
                {this.textWrapper(`Max Profit estimated for 10 units: ₹ ${maxProfit}`)}
            </View>
        );
    }

    renderGraph(chartData) {
        return (
            <VictoryChart
                height={300}
                theme={VictoryTheme.material}
            >
                <VictoryLine
                    data={chartData}
                    x="date"
                    y="price"
                />
                <VictoryAxis
                    style={{ tickLabels: { angle: -45, fontSize: 8  } }}
                />
                <VictoryAxis dependentAxis
                    style={{ tickLabels: { fontSize: 8  } }}
                />
            </VictoryChart>
        );
    }

    render() {
        const  { loading, data } = this.props;
        const chartData = data
            .filter(record => !!record.value)
            .map(record => ({
                date: moment(record.value.fields.Date).format('D/MM'),
                price: record.value.fields.Amount,
            }));
        return (
            <View
                pointerEvents="none"
                style={{
                    flex: 1,
                    margin: 3,
                    paddingVertical: 15,
                    paddingHorizontal: 2,
                    backgroundColor: COLORS.BLUE_GREY_100,
                    borderRadius: 15,
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
            >
                {this.renderDetails(chartData)}
                {loading ? (
                    <ActivityIndicator color={COLORS.BLUE_GREY_700} />
                ) : this.renderGraph(chartData)}
               
            </View>
        );
    }
}