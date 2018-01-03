const config = {
    autoprefixer: false,
    rawCache: false,
    calc: true,
    colormin:true,
    convertValues: {
        length: false,
        time: true,
        angle: true,
        precision: false
    },
    discardComments: {
        removeAll: true
    },
    discardDuplicates: true,
    discardEmpty: true,
    discardOverwritten: true,
    discardUnused: {
        fontFace: false,
        counterStyle: true,
        keyframes: true,
        namespace: true
    },
    mergeIdents: true,
    mergeLonghand: true,
    mergeRules: true,
    minifyFontValues: {
        removeAfterKeyword: true,
        removeDuplicates: true,
        removeQuotes: true
    },
    minifyGradients: true,
    minifyParams: true,
    minifySelectors: true,
    normalizeCharset: {
        add: true
    },
    normalizeDisplayValues: true,
    normalizePositions: true,
    normalizeRepeatStyle: true,
    normalizeString: {
        preferredQuote: 'single'
    },
    normalizeTimingFunctions: true,
    normalizeUnicode: true,
    normalizeUrl: true,
    normalizeWhitespace: true,
    orderedValues: true,
    reduceIdents: true,
    reduceInitial: true,
    reduceTransforms: true,
    svgo: true,
    uniqueSelectors: true,
    zindex: true,
};

export default config;
