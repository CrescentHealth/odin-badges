import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "../../../styles/index";
import { G, Defs, LinearGradient, Stop } from "react-native-svg";
import { touchVibrate } from "../../../utils";
import moment from "moment";
import {
  VictoryChart,
  VictoryArea,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryBar,
  VictoryTooltip,
  VictoryContainer,
  VictoryVoronoiContainer,
} from "victory-native";

function generateSampleData() {
  var increment = Math.PI / 12;
  var data = [];
  var count = 0;
  var sunspot;
  for (let i = Math.PI / 2; i < 2.5 * Math.PI; i += increment) {
    var dataPoint = {
      x: moment().add(count, "hours").format(),
      y: 0.3 * -Math.sin(i),
    };
    if (count === 11) {
      sunspot = dataPoint;
    }
    count++;
    data.push(dataPoint);
  }
  return [data, sunspot];
}

// function estimateScatterPoint(data) {
//   var now = moment();
//   data.forEach(element => {
//     var x = element["x"];
//     var y = element["y"];
//     if (x >)
//   });
// }

function getSunrise() {
  var increment = Math.PI / 12;
  console.log("increment:", increment);
  var data = [];
  for (let i = Math.PI / 2; i < 2.5 * Math.PI; i += increment) {
    var dataPoint = {
      x: moment().add(i, "hours").format(),
      y: 0.3 * -Math.sin(i),
    };
    console.log("i:", i);
    data.push(dataPoint);
  }
  return data;
}

export default class DayProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeWindow: 24,
    };
  }

  render() {
    const theme = this.props.theme;
    const data = generateSampleData();
    // const scatterPoint = [{x: moment(), y:}]
    // const getSunrise;
    // console.log("data:", data);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <VictoryChart
          // standalone={false}
          height={220}
          width={390}
          domainPadding={{ top: 50, bottom: 50, left: 50, right: 50 }}
          style={{ marginBottom: 30 }}
          scale={{ x: "time", y: "linear" }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) =>
                `${moment(datum.x).format("h:mm")}, ${
                  Math.round(datum.y * 100) / 100
                }`
              }
            />
          }
        >
          <G height={300}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor="#84c2f0" />
                <Stop offset="25%" stopColor="#84c2f0" stopOpacity="0.7" />
                <Stop offset="50%" stopColor="#84c2f0" />
                <Stop offset="50%" stopColor="#383b7b" />

                <Stop offset="100%" stopColor="#383b7b" />
              </LinearGradient>
            </Defs>
          </G>
          <VictoryArea
            style={{
              data: {
                stroke: "gray",
                strokeWidth: 0.5,
                fill: "url(#grad)",
              },
              parent: { border: "1px solid #ccc" },
            }}
            interpolation="natural"
            data={data[0]}
          />
          <VictoryScatter
            size={10}
            style={{
              data: { fill: "orange" },
            }}
            interpolation="natural"
            data={[data[1]]}
            // y={(d) => console.log("y", d)}
          />
          <VictoryAxis
            independentAxis
            style={{
              tickLabels: {
                fontFamily: fonts.FONT_FAMILY,
                fill: theme.headingTextColor,
                strokeWidth: 5,
                fontSize: fonts.FONT_SIZE_MEDIUM,
              },
              axis: { stroke: "gray", strokeWidth: 0.1 },
              touchAction: "none",
            }}
            // tickValues={
            //   chartWindow === "week" || chartWindow === "year"
            //     ? tickValues
            //     : null
            // }
            tickCount={3}
            tickFormat={(t) => {
              return moment(t).format("h:mm");
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}
