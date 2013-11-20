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
--namespace="src.base.control.formBuilder" ^
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
--namespace="src.test.control.autocomplete.whenFormattingTheAutocompleteResultText" ^
--namespace="src.test.control.autocomplete.whenInitializingAnAutocomplete" ^
--namespace="src.test.control.autocomplete.whenResettingAnAutocomplete" ^
--namespace="src.test.control.autocomplete.whenSettingTheInputHandlerSelectRow" ^
--namespace="src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod" ^
--namespace="src.test.control.buttonList.whenInitializingAButtonList" ^
--namespace="src.test.control.buttonList.whenTogglingAClass" ^
--namespace="src.test.control.buttonList.whenUpdatingTheHiddenValue" ^
--namespace="src.test.control.dropDownList.whenCreatingAFillListHandler" ^
--namespace="src.test.control.dropDownList.whenInitializingADropDownList" ^
--namespace="src.test.control.editableDiv.whenApplyingTheEdittedText" ^
--namespace="src.test.control.editableDiv.whenCreatingTheCancelHandler" ^
--namespace="src.test.control.editableDiv.whenCreatingTheSubmitResultHandler" ^
--namespace="src.test.control.editableDiv.whenCreatingTheTextContainerClick" ^
--namespace="src.test.control.editableDiv.whenInitializingAnEditableDiv" ^
--namespace="src.test.control.editableDiv.whenRevertingText" ^
--namespace="src.test.control.editableDiv.form.whenCreatingTheForm" ^
--namespace="src.test.control.editableDiv.form.whenCreatingTheValidationRules" ^
--namespace="src.test.control.editableDiv.form.whenSettingTheCancelHandler" ^
--namespace="src.test.control.feedback.form.whenCreatingTheForm" ^
--namespace="src.test.control.feedback.whenInitializingAFeedback" ^
--namespace="src.test.control.formatTextAreaDisplay.whenCleaningUpTheText" ^
--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptEqualityOperators" ^
--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllJavascriptReservedWords" ^
--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllListedWords" ^
--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllParameters" ^
--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllQuotedText" ^
--namespace="src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems" ^
--namespace="src.test.control.formatTextAreaDisplay.whenCreatingTheShortCutHandler" ^
--namespace="src.test.control.formatTextAreaDisplay.whenFormattingHtml" ^
--namespace="src.test.control.formatTextAreaDisplay.whenFormattingJavaScript" ^
--namespace="src.test.control.formatTextAreaDisplay.whenFormattingTheRawTextAndUpdatingTheFormatTextAreaDisplay" ^
--namespace="src.test.control.formatTextAreaDisplay.whenInitializingAFormatTextAreaDisplay" ^
--namespace="src.test.control.formatTextAreaDisplay.whenSurroundingWithColor" ^
--namespace="src.test.control.formBuilder.whenCreatingAControl" ^
--namespace="src.test.control.formBuilder.whenInitializingAFormBuilder" ^
--namespace="src.test.control.formBuilder.validation.whenCreatingAValidationItem" ^
--namespace="src.test.control.formBuilder.validation.whenCreatingTheValidation" ^
--namespace="src.test.control.formComponent.whenFillingTheFormWithData" ^
--namespace="src.test.control.formComponent.whenHandlingTheResult" ^
--namespace="src.test.control.formComponent.whenInitializingTheForm" ^
--namespace="src.test.control.formComponent.whenSettingTheSubmitButton" ^
--namespace="src.test.control.formComponent.whenSettingUpAForm" ^
--namespace="src.test.control.formComponent.whenTheFormIsSubmitted" ^
--namespace="src.test.control.gridBuilder.whenCreatingTheGridRefresh" ^
--namespace="src.test.control.gridBuilder.whenCreatingThePagerButtons" ^
--namespace="src.test.control.gridBuilder.whenCreatingTheResultHandler" ^
--namespace="src.test.control.gridBuilder.whenInitializingTheGrid" ^
--namespace="src.test.control.gridBuilder.whenRefreshingTheGrid" ^
--namespace="src.test.control.gridBuilder.header.whenCreatingAHeaderColumn" ^
--namespace="src.test.control.gridBuilder.header.whenCreatingTheHeaderRow" ^
--namespace="src.test.control.gridBuilder.header.whenCreatingTheHeaderSortHandler" ^
--namespace="src.test.control.gridBuilder.header.whenUpdatingAColumnHeaderSortClass" ^
--namespace="src.test.control.gridBuilder.row.whenCreatingAColumnFromRowMap" ^
--namespace="src.test.control.gridBuilder.row.whenCreatingARow" ^
--namespace="src.test.control.gridBuilder.row.whenCreatingRows" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine.js" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine-html.js" ^
--compiler_flags="--warning_level=QUIET" ^
--compiler_flags="--generate_exports" > "content/script/run/control/control.js"
rem --jvm_flags="-d32" ^