module.exports = (api, opts, rootOptions) => {
    api.extendPackage({
        scripts: {
            "build:android": "cross-env PLATFORM_ENV=android vue-cli-service build",
            "build:ios": "cross-env PLATFORM_ENV=ios vue-cli-service build"
        },
        devDependencies: {
            "cross-env": "^5.2.0",
            "fs-extra": "^7.0.1",
        }
    })
    api.render('./templates')
}