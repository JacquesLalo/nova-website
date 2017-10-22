// @flow

import { styles as appStyles } from '../../constants.js'

import type {
    Props,
    LayerProps,
} from './BgTypes.jsx'

import type {
    CSSStyleDeclaration,
    GetStyles,
} from '../../constantTypes.jsx'


type Styles = {
    wrapper: CSSStyleDeclaration,
    split: {
        wrapper: CSSStyleDeclaration,
        wrapperBottom: CSSStyleDeclaration,
    },
    frontBg: CSSStyleDeclaration,
    backBg: CSSStyleDeclaration,
    overlay: CSSStyleDeclaration,
    splitBottomTranslateY: string,
}

const getStyles: GetStyles<Props, Styles> = props => {
    const lineTopFactor = (9 + 2 * props.linePosition) / 24 * 100
    const lineHeightFactor = 4 * 100 / 24
    const lineTop = lineTopFactor + 'vh'
    const lineHeight = lineHeightFactor + 'vh'
    const progress = props.slideTransitionProgress
    const heightBottomFactor = 100 - (lineTopFactor + lineHeightFactor)
    const heightBottom = heightBottomFactor + 'vh'

    const transformTop = 'calc(-' + progress + ' * ' + lineTop + ')'
    const transformBottom = 'calc(' + progress + ' * ' + heightBottom + ')'

    return {
        wrapper: {
            position: 'absolute',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
        },
        split: {
            wrapper: {
                width: '100vw',
                height: lineTop,
                position: 'absolute',
                overflow: 'hidden',
                zIndex: 2,
                transform: 'translateY(' + transformTop + ')',
            },
            wrapperBottom: {
                top: 'calc(' + lineTop + ' + ' + lineHeight + ')',
                height: '100vh',
                transform: 'translateY(' + transformBottom + ')',
            },
        },
        frontBg: {
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        },
        backBg: {
            zIndex: -2,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        },
        overlay: {
            height: '100vh',
            width: '100vw',
            backgroundColor: appStyles.themes[props.appTheme].bgOverlayColor,
            zIndex: 3,
            position: 'absolute',
            transition: 'background-color 0.5s linear',
        },
        splitBottomTranslateY: ('calc(-' + lineTop + ' - ' + lineHeight + ')'),
    }
}

type LayerStyles = {
    layer: CSSStyleDeclaration,
}

const getLayerStyles:  GetStyles<LayerProps, LayerStyles> = props => {
    return {
        layer: {
            backgroundImage: 'url(' + props.imgUrl + ')',
            backgroundSize: 'cover',
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            backgroundPosition: props.layerParalax,
            opacity: props.layerOpacity,
            transform: 'translateY(' + props.translateY + ')',
        },
    }
}

type LayerAssemblyStyles = {
    wrapper: CSSStyleDeclaration,
}

const getLayerAssemblyStyles: GetStyles<void, LayerAssemblyStyles> = () => {
    return {
        wrapper: {
            zIndex: -1,
            height: '100vh',
            width: '100vw',
            position: 'absolute',
        }
    }
}

export default getStyles

export {
    getLayerStyles,
    getLayerAssemblyStyles,
}
