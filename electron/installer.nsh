!macro customInstall
	File "${BUILD_RESOURCES_DIR}\Resources.pri"
	File "${BUILD_RESOURCES_DIR}\Bancoin Client.visualelementsmanifest.xml"
	File "${BUILD_RESOURCES_DIR}\icons\tile*.png"
!macroend

!macro customUnInstall
	Delete "Resources.pri"
	Delete "Bancoin Client.visualelementsmanifest.xml"
	Delete "tile*.png"
!macroend

