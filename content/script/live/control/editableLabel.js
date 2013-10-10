//  Map
// 
//  {items:
//    [
//      { withDate: true },
//      { withDate: false }
//    ]
//  }
//
//  createARow
//  createTheEdit -> postAction
//  div
//    div "labelOne"
//    div "labelTwo"
//      div "theEdit"
//        textbox "theHistoryDate"
//        hidden  "theHistoryId"
//        button
//          onClick -> postAction


//  createARow -> resultItem count editSection
//    label ->
//      (div
//        (id count)
//        (class clickableLabel)
//        (text resultItem['Date']))
//    label -> click ->
//      createTheLabelClickHandler -> label resultItem['HistoryId'] editSection
//
//

//  Done when creating the labels:
//  
//  createTheLabelClickHandler -> label historyId editSection
//    function ->
//      setSection -> editSection historyId label.innerHTML
//      goog.dom.insertSiblingAfter(label, editSection)
//      hide -> label
//      show -> edit
//
//  setSection -> editSection historyId dateText
//    goog.dom.setTextContent -> dateText
//
//    hidden ->
//      goog.getElement -> editSection
//        type == 'hidden'
//
//    goog.dom.forms.setValue -> hidden historyId
//      


//  reset -> container
//    item in container ->
//      item is entry
//        hide
//      item is label
//       show
