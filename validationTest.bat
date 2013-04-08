python c:/lib/closure/closure-library/closure/bin/closurebuilder.py ^
--root="c:/lib/closure/closure-library/" ^
--root="content/script/live/helper/" ^
--root="content/script/live/validation/" ^
--root="content/script/test/validation/" ^
--namespace="src.base.helper.arrayHelper" ^
--namespace="src.site.validation.validationInterpreter" ^
--namespace="src.site.validation.validateSocialSecurityNumber" ^
--namespace="src.site.validation.validateText" ^
--namespace="src.test.validation.whenCheckingIfASocialSecurityNumberIsValid" ^
--namespace="src.test.validation.whenValidatingAString" ^
--namespace="src.test.validation.whenValidatingTextWithADefaultValue" ^
--namespace="src.test.validation.validationInterpreter.whenCreatingAValidtionCall" ^
--namespace="src.test.validation.validationInterpreter.whenInterpretingRules" ^
--output_mode=compiled ^
--compiler_jar="c:/lib/closure/compiler.jar" ^
--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine.js" ^
--compiler_flags="--externs=content/script/run/jasmine/jasmine-html.js" ^
--compiler_flags="--warning_level=QUIET" ^
--compiler_flags="--generate_exports" > "content/script/run/validation/validation.js"