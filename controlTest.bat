python c:/lib/closure/closure-library/closure/bin/closurebuilder.py ^
--jvm_flags="-d32" ^
--root="c:/lib/closure/closure-library/" ^
--root="content/script/live/" ^
--root="content/script/test/control/" ^
--namespace="src.base.helper.constants" ^
--namespace="src.base.helper.domCreation" ^
--namespace="src.base.helper.domHelper" ^
--namespace="src.base.helper.events" ^
--namespace="src.base.control.autocomplete" ^
--namespace="src.base.control.buttonList" ^
--namespace="src.base.control.dropDownList" ^
--namespace="src.base.control.formComponent" ^
--namespace="src.base.control.gridBuilder" ^
--namespace="src.base.control.messageBox" ^
--namespace="src.base.control.popupDatePicker" ^
--namespace="src.base.control.redirectList" ^
--namespace="src.base.control.refreshPair" ^
--namespace="src.base.control.simpleInformationDisplay" ^
--namespace="src.base.control.tagContainer" ^
--namespace="src.test.control.autocomplete.whenFormattingTheAutocompleteResultText" ^
--namespace="src.test.control.autocomplete.whenSettingTheInputHandlerSelectRow" ^
--namespace="src.test.control.autocomplete.whenInitializingAnAutocomplete" ^
--namespace="src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod" ^
--namespace="src.test.control.buttonList.whenCreatingAButtonList" ^
--namespace="src.test.control.buttonList.whenTogglingAClass" ^
--namespace="src.test.control.buttonList.whenUpdatingTheHiddenValue" ^
--namespace="src.test.control.dropDownList.whenCreatingAFillListHandler" ^
--namespace="src.test.control.dropDownList.whenInitializingADropDownList" ^
--namespace="src.test.control.formComponent.whenFillingTheFormWithData" ^
--namespace="src.test.control.formComponent.whenHandlingTheResult" ^
--namespace="src.test.control.formComponent.whenInitializingTheForm" ^
--namespace="src.test.control.formComponent.whenSettingTheSubmitButton" ^
--namespace="src.test.control.formComponent.whenSettingUpAForm" ^
--namespace="src.test.control.formComponent.whenTheFormIsSubmitted" ^
--namespace="src.test.control.gridBuilder.whenCopyingOptions" ^
--namespace="src.test.control.gridBuilder.whenCreatingARow" ^
--namespace="src.test.control.gridBuilder.whenCreatingThePagerButtons" ^
--namespace="src.test.control.gridBuilder.whenCreatingRows" ^
--namespace="src.test.control.gridBuilder.whenCreatingTheHeaderRow" ^
--namespace="src.test.control.gridBuilder.whenCreatingTheResultHandler" ^
--namespace="src.test.control.gridBuilder.whenInitializingTheGrid" ^
--namespace="src.test.control.gridBuilder.whenRefreshingTheGrid" ^
--namespace="src.test.control.messageBox.whenClearingTheMessages" ^
--namespace="src.test.control.messageBox.whenCreatingAMessageBox" ^
--namespace="src.test.control.messageBox.whenCreatingAResult" ^
--namespace="src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult" ^
--namespace="src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult" ^
--namespace="src.test.control.popupDatePicker.whenCreatingAPopupDatePicker" ^
--namespace="src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent" ^
--namespace="src.test.control.popupDatePicker.whenFormattingTheDate" ^
--namespace="src.test.control.redirectList.whenCreatingRedirectButtonOptions" ^
--namespace="src.test.control.redirectList.whenCreatingTheClickEvent" ^
--namespace="src.test.control.redirectList.whenInitializingARedirectList" ^
--namespace="src.test.control.refreshPair.whenCreatingTheUrlSubmitHandler" ^
--namespace="src.test.control.refreshPair.whenInitializingARefreshPair" ^
--namespace="src.test.control.refreshPair.whenCreatingTheOnChangeHandler" ^
--namespace="src.test.control.simpleInformationDisplay.whenCreatingALayoutItem" ^
--namespace="src.test.control.simpleInformationDisplay.whenFillingTheRows" ^
--namespace="src.test.control.simpleInformationDisplay.whenInitializingASimpleInformationDisplay" ^
--namespace="src.test.control.simpleInformationDisplay.whenRefreshingASimpleInformationDisplay" ^
--namespace="src.test.control.tagContainer.whenCreatingADeleteResultHandler" ^
--namespace="src.test.control.tagContainer.whenCreatingARetrieveTagsHandler" ^
--namespace="src.test.control.tagContainer.whenCreatingATag" ^
--namespace="src.test.control.tagContainer.whenCreatingTags" ^
--namespace="src.test.control.tagContainer.whenInitializingATagContainer" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine.js" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine-html.js" ^
--compiler_flags="--warning_level=QUIET" ^
--compiler_flags="--generate_exports" > "content/script/run/control/control.js"