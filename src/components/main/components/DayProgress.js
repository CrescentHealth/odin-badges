import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fonts } from "../../../styles/index";
import { touchVibrate } from "../../../utils";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
  VictoryContainer,
} from "victory-native";

export default class DayProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const theme = this.props.theme;
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
          height={300}
          width={390}
          domainPadding={{ top: 50, bottom: 50, left: 50, right: 50 }}
          style={{ marginBottom: 30 }}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              // parent: { border: "1px solid #ccc" },
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 },
            ]}
          />
        </VictoryChart>
      </View>
    );
  }
}
