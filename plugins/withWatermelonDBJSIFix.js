const { withMainApplication } = require('@expo/config-plugins');

function withWatermelonDBJSIFix(config) {
  return withMainApplication(config, async (config) => {
    let contents = config.modResults.contents;
    contents = contents.replace(/import com\.facebook\.react\.bridge\.JSIModulePackage;\s*/g, '');
    contents = contents.replace(/import com\.nozbe\.watermelondb\.jsi\.WatermelonDBJSIPackage;\s*/g, '');
    config.modResults.contents = contents;
    return config;
  });
}

module.exports = withWatermelonDBJSIFix;
