import * as React from "react"
import Svg, { Path } from "react-native-svg"

const MakePostIcon = (props) => (
  <Svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.95 10.555h-7.456v7.56H7.52v-7.56H.1V7.86h7.42V.265h2.975V7.86h7.455v2.695Z"
      fill="#FFCED4"
    />
  </Svg>
)

export default MakePostIcon
