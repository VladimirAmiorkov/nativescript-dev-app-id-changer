# '`nativescript-dev-app-id-changer`' a NativeScript dev plugin

This is a very simple package that when installed will try to change the __id/applicationId__ of the NativeScript application to which it is being installed to by adding a random string at the end of the current ID. After installing the `nativescript-dev-app-id-changer` make sure you DO NOT COMMIT the changes to the __package.json__ and __app.gradle__ files of your project (those files are updated/changed by the package)

## Purpose
While working with real devices of IOS and applications that are under a corporate certificate/provisioning it is often the case that executing `tns run ios` will throw and error that the current dev team is not correct etc. In this case if you only want to work on the app an do not intent to ship it immediately after building it the most common "workaround" is to change the ID of the app before you try to deploy it to the real device. This package automates the renaming of the related fields of the NativeScript app by adding a random string of characters to the current app's ID.

## How to use
You should only need to use this once before starting to work on app you intent to deploy to a real device **FOR DEVELOPMENT** purposes only so simply install it from npm `npm i nativescript-dev-app-id-changer --no-save`.