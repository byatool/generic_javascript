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
--namespace="src.base.control.pager" ^
--namespace="src.base.control.popupDatePicker" ^
--namespace="src.base.control.redirectList" ^
--namespace="src.base.control.refreshPair" ^
--namespace="src.base.control.simpleInformationDisplay" ^
--namespace="src.base.control.tagContainer" ^
--namespace="src.base.control.zippyContainer" ^
--namespace="src.base.control.zippyGrid" ^
--namespace="src.test.control.messageBox.whenClearingTheMessages" ^
--namespace="src.test.control.messageBox.whenCreatingAMessageBox" ^
--namespace="src.test.control.messageBox.whenCreatingAResult" ^
--namespace="src.test.control.messageBox.whenForcingAMessageBoxToHide" ^
--namespace="src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult" ^
--namespace="src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult" ^
--namespace="src.test.control.pager.whenCloningTheOptions" ^
--namespace="src.test.control.pager.whenCreatingAPagerButton" ^
--namespace="src.test.control.pager.whenCreatingAPagerNumberButton" ^
--namespace="src.test.control.pager.whenCreatingAPageNumberContainer" ^
--namespace="src.test.control.pager.whenInitializingAPager" ^
--namespace="src.test.control.pager.whenTogglingEnabledOnAButton" ^
--namespace="src.test.control.popupDatePicker.whenInitializingAPopupDatePicker" ^
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
--namespace="src.test.control.tagContainer.whenAddingATagToTheList" ^
--namespace="src.test.control.tagContainer.whenCreatingADeleteResultHandler" ^
--namespace="src.test.control.tagContainer.whenCreatingARetrieveTagsHandler" ^
--namespace="src.test.control.tagContainer.whenCreatingATag" ^
--namespace="src.test.control.tagContainer.whenCreatingTags" ^
--namespace="src.test.control.tagContainer.whenInitializingATagContainer" ^
--namespace="src.test.control.wall.whenCreatingTheMapping" ^
--namespace="src.test.control.wall.whenInitializingAWall" ^
--namespace="src.test.control.wall.form.whenCreatingEmptyDatePickerOptions" ^
--namespace="src.test.control.wall.form.whenCreatingTheEnterHandler" ^
--namespace="src.test.control.wall.form.whenCreatingTheEntryForm" ^
--namespace="src.test.control.wall.form.whenCreatingTheSubmitResultHandler" ^
--namespace="src.test.control.wall.form.whenCreatingTheValidationRules" ^
--namespace="src.test.control.wall.form.whenInitializingTheForm" ^
--namespace="src.test.control.wall.row.whenCreatingARow" ^
--namespace="src.test.control.wall.row.whenCreatingTheDeleteContainer" ^
--namespace="src.test.control.wall.row.whenCreatingTheDeletePostHandler" ^
--namespace="src.test.control.wall.row.whenCreatingTheRowInformationContainer" ^
--namespace="src.test.control.zippyContainer.whenInitializingAZippyContainer" ^
--namespace="src.test.control.zippyGrid.whenInitializingTheZippyGrid" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine.js" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine-html.js" ^
--compiler_flags="--warning_level=QUIET" ^
--compiler_flags="--generate_exports" > "content/script/run/control/secondControl.js"
rem --jvm_flags="-d32" ^