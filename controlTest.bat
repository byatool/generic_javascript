python c:/lib/closure/closure-library/closure/bin/closurebuilder.py ^
--root="c:/lib/closure/closure-library/" ^
--root="content/script/live/" ^
--root="content/script/test/control/" ^
--namespace="src.base.helper.constants" ^
--namespace="src.base.helper.domCreation" ^
--namespace="src.base.helper.domHelper" ^
--namespace="src.base.helper.events" ^
--namespace="src.base.control.buttonList" ^
--namespace="src.base.control.formComponent" ^
--namespace="src.base.control.messageBox" ^
--namespace="src.base.control.popupDatePicker" ^
--namespace="src.test.control.formComponent.whenHandlingTheResult" ^
--namespace="src.test.control.formComponent.whenInitializingTheForm" ^
--namespace="src.test.control.formComponent.whenSettingTheSubmitButton" ^
--namespace="src.test.control.formComponent.whenSettingUpAForm" ^
--namespace="src.test.control.formComponent.whenTheFormIsSubmitted" ^
--namespace="src.test.control.messageBox.whenClearingTheMessages" ^
--namespace="src.test.control.messageBox.whenCreatingAMessageBox" ^
--namespace="src.test.control.messageBox.whenCreatingAResult" ^
--namespace="src.test.control.messageBox.whenSettingTheAppearanceOfAMessageBoxBasedOnAResult" ^
--namespace="src.test.control.messageBox.whenUpdatingMesssagesInAMessageBoxByAResult" ^
--namespace="src.test.control.popupDatePicker.whenCreatingAPopupDatePicker" ^
--namespace="src.test.control.popupDatePicker.whenSettingTheDatePickerChangeEvent" ^
--namespace="src.test.control.buttonList.whenCreatingAButtonList" ^
--namespace="src.test.control.buttonList.whenTogglingAClass" ^
--namespace="src.test.control.buttonList.whenUpdatingTheHiddenValue" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine.js" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine-html.js" ^
--compiler_flags="--warning_level=QUIET" ^
--compiler_flags="--generate_exports" > "content/script/run/control/control.js"