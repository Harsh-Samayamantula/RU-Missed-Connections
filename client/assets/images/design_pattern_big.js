import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
import { ThemeContext } from '../../App'

const SvgComponent = (props) => {
  const theme = React.useContext(ThemeContext)
  
  return( 
  <Svg
    width={356}
    height={253}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M454.425 240.936c-.472.735-1.123.761-1.937.133-4.408.11-8.151-1.135-12.541-2.871-17.43-6.894-34.496-14.795-51.887-21.804-24.712-9.959-51.164-16.538-76.863-23.424-20.959-5.616-42.049-8.981-63.701-5.646-54.761 8.436-102.148 38.783-153.65 56.679-22.965 7.98-44.178 14.598-65.59.029C5.845 228.785 1.348 200.716.658 175.723-.481 134.463 16.449 92.7 37.45 57.871 54.574 29.478 76.815 2.02 100.242-21.39c29.141-29.12 65.604-50.648 99.9-73.06 33.383-21.816 69.502-41.288 99.354-68.007 16.003-14.323 133.16 388.245 152.992 403.526a22.96 22.96 0 0 0 1.937-.133Z"
      fill="url(#a)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={121}
        y1={230}
        x2={232.5}
        y2={-37}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.colors.primary} stopOpacity={0} />
        <Stop offset={1} stopColor={theme.colors.primary} stopOpacity={0.38} />
      </LinearGradient>
    </Defs>
  </Svg>)
}

export default SvgComponent
