python c:/lib/closure/closure-library/closure/bin/closurebuilder.py ^
--root="c:/lib/closure/closure-library/" ^
--root="content/script/live/" ^
--namespace="src.base.helper.constants" ^
--namespace="src.base.helper.domCreation" ^
--namespace="src.base.helper.domHelper" ^
--namespace="src.base.helper.events" ^
--namespace="src.base.control.autocomplete" ^
--namespace="src.base.control.formComponent" ^
--namespace="src.base.control.messageBox" ^
--namespace="src.base.control.popupDatePicker" ^
--namespace="src.site.validation.validateSocialSecurityNumber" ^
--namespace="src.site.validation.validateText" ^
--namespace="src.site.view.addEmployee" ^
--namespace="src.site.view.editEmployee" ^
--namespace="src.site.view.retrieveBySocialSecurityNumber" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--generate_exports" > "content/script/live/final.js"