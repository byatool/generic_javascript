﻿<html>
  <head>
    <link rel="stylesheet" href="../../content/style/css/final.css" type="text/css" media="screen" />
    <script type="text/javascript" src="../../content/script/live/final.js"></script>
    <script type="text/javascript">
      var clickIt = function() {
      alert(document.getElementById('idHolder').value);
      }
    </script>
  </head>
  
  <body>
    <div id="mainContainer" ></div>
    
  </body>
  
  <script type="text/javascript">
    var options = {};
    
    options[src.base.control.autocomplete.ContainerId] = 'parentContainer';
    options[src.base.control.autocomplete.Url] = 'http://localhost:57388/Test/AutocompleteWithObjectArray';
    options[src.base.control.autocomplete.HiddenId] = 'someHiddenId';
    
    var result = src.base.control.autocomplete.initialize(options);
    var container = document.getElementById('mainContainer');
    
    container.appendChild(result);
  </script>
</html>
