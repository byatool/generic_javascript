python c:/lib/closure/closure-library/closure/bin/closurebuilder.py ^
--jvm_flags="-d32" ^
--root="c:/lib/closure/closure-library/" ^
--root="content/script/live/" ^
--namespace="src.base.helper.arrayHelper" ^
--namespace="src.base.helper.constants" ^
--namespace="src.base.helper.domCreation" ^
--namespace="src.base.helper.domHelper" ^
--namespace="src.base.helper.events" ^
--namespace="src.base.control.autocomplete" ^
--namespace="src.base.control.buttonList" ^
--namespace="src.base.control.dropDownList" ^
--namespace="src.base.control.formComponent" ^
--namespace="src.base.control.messageBox" ^
--namespace="src.base.control.popupDatePicker" ^
--namespace="src.base.control.refreshPair" ^
--namespace="src.base.control.redirectList" ^
--namespace="src.base.control.simpleInformationDisplay" ^
--namespace="src.base.control.tabs" ^
--namespace="src.site.validation.validateSocialSecurityNumber" ^
--namespace="src.site.validation.validateText" ^
--namespace="src.site.validation.validationInterpreter" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--generate_exports" > "content/script/live/final.js"