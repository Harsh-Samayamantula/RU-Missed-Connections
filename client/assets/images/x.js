import * as React from "react"
import Svg, { Path } from "react-native-svg"


const XSign = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m3 3 7 7m7 7-7-7m0 0 7-7m-7 7-7 7"
      stroke="#AFAFAF"
      strokeOpacity={0.59}
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default XSign
