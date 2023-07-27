import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { ThemeContext } from "../../App"

const DesignPatternSmall = (props) => { 
  const theme = React.useContext(ThemeContext)

  return ( 
  <Svg
    width={302}
    height={118}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M324.62 15.753c-.146.598-.573.766-1.26.536-2.909 1.09-5.687 1.126-9.009.984-13.187-.564-26.363-1.88-39.551-2.53-18.74-.922-37.862.806-56.553 2.155-15.243 1.101-30.058 3.729-43.708 10.943-34.523 18.246-59.107 49.364-89.288 73.151-13.458 10.607-26.063 19.903-43.664 15.154-18.42-4.971-27.858-22.603-34.055-39.067C-2.7 49.899-1.015 18.215 4.974-9.796c4.882-22.835 13.387-46.23 23.61-67.206 12.717-26.093 32.052-48.825 49.741-71.644 17.218-22.213 36.796-43.498 50.538-68.158C136.23-230.023 306.648 10.701 323.36 16.289c.417-.156.836-.334 1.26-.536Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={17.872}
        y1={93.188}
        x2={164.365}
        y2={-30.04}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.colors.primary} stopOpacity={0} />
        <Stop offset={1} stopColor={theme.colors.primary} stopOpacity={0.38} />
      </LinearGradient>
    </Defs>
  </Svg>
  )
}

export default DesignPatternSmall
