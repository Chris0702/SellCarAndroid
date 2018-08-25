jquery_lang_js.prototype.run = function () {
  var langElems = $('[jql]');
  var elemsLength = langElems.length;

  while (elemsLength--) {
    var elem = langElems[elemsLength];
    var elemType = elem.tagName;
    if (elemType != 'HTML') {
      this.runByElement(this.currentLang, elem);
    }
  }
};

jquery_lang_js.prototype.runByDivId = function (lang, divId) {

  var langElems = $("#" + divId + ' [jql]');
  var elemsLength = langElems.length;

  while (elemsLength--) {
    var elem = langElems[elemsLength];
    var elemType = elem.tagName;
    if (elemType != 'HTML') {

      this.runByElement(lang, elem);
    }
  }
};

jquery_lang_js.prototype.runByElement = function (lang, element) {

  var langElem = $(element);
  if (langElem.is('input')) {
    // An input element
    switch (langElem.attr('type')) {
      case 'button':
      case 'submit':
        // when I change page with jQueryMobile, this value has already been changed into the actual string
        if (!langElem.data('deftext')) {
          langElem.data('deftext', langElem.val());
        }
        break;
      case 'password':
      case 'text':
        // Check for a placeholder text value
        var plText = langElem.attr('placeholder');
        if (plText && !langElem.data('deftext')) {
          langElem.data('deftext', plText);
        }
        break;
    }
  } else if (langElem.is("a") && langElem.attr('title')) {
    var titleText = langElem.attr('title');
    if (titleText && !langElem.data('deftext')) {
      langElem.data('deftext', titleText);
    }
  } else {
    // Not an input element
    if (!langElem.data('deftext')) {
      langElem.data('deftext', langElem.text());
    }
  }
  // Now that the language system is setup, check
  // if there is a current language and switch to it
  this.changeElement(lang, langElem);
  return langElem;
};

jquery_lang_js.prototype.changeElement = function (lang, element) {
  if (this.currentLang != lang) {
    this.update(lang);
  }
  this.currentLang = lang;

  // Get the page HTML
  var langElem;
  if (element == undefined) {
    langElem = $('[jql]');
  } else if (element == '') {
    langElem = $('[jql]');
  } else {
    langElem = $(element);
  }
  if (this.lang[lang]) {
    if (langElem.data('deftext')) {
      var currentText, defaultLangText, newText, newHtml;
      if (langElem.is('input')) {
        // An input element
        switch (langElem.attr('type')) {
          case 'button':
          case 'submit':
            // A button or submit, change the value attribute
            currentText = langElem.val();
            defaultLangText = langElem.data('deftext');
            newText = this.convert(defaultLangText, lang);
            newHtml = currentText.replace(currentText, newText);
            langElem.val(newHtml);
            break;
          case 'password':
          case 'text':
            // Check for a placeholder text value
            currentText = langElem.attr('placeholder');
            defaultLangText = langElem.data('deftext');
            newText = this.convert(defaultLangText, lang);
            newHtml = currentText.replace(currentText, newText);
            langElem.attr('placeholder', newHtml);
            break;
        }
      } else if (langElem.is('a') && langElem.attr('title')) {
        defaultLangText = langElem.data('deftext');
        currentText = langElem.attr('title');
        newText = this.convert(defaultLangText, lang);
        newHtml = currentText.replace(currentText, newText);

        langElem.attr('title', newHtml);
      } else {
        // Not an input element
        currentText = langElem.text();
        defaultLangText = langElem.data('deftext');
        newText = this.convert(defaultLangText, lang);
        newHtml = currentText.replace(currentText, newText);
        langElem.text(newHtml);
      }

    } else {
      //console.log('!No language data for element... have you executed .run() first?');
    }

  } else {
    console.log('Cannot switch language, no language pack defined for "' + lang + '"');
  }
  return langElem;
};

jquery_lang_js.prototype.convert = function (orgKey, lang) {

  if (orgKey) {
    key = orgKey.trim();
    if (lang && this.lang.hasOwnProperty(lang) && this.lang[lang].hasOwnProperty(key) && this.lang[lang][key] != undefined) {
      return this.lang[lang][key];
    }
    else {
      if (this.lang.hasOwnProperty(this.currentLang) && this.lang[this.currentLang].hasOwnProperty(key) && this.lang[this.currentLang][key] != undefined) {
        return this.lang[this.currentLang][key];
      }
      else if (this.lang.hasOwnProperty('defaultLang') && this.lang['defaultLang'].hasOwnProperty(key) && this.lang['defaultLang'][key] != undefined) {
        return this.lang['defaultLang'][key];
      }
      else {
        if (key.match(/t_[0-9]{8}/)) {
          //TODO: log key
          var defaultKey = waDashboardConstants.WARN_KEYNOTEXIST;
          if (this.lang.hasOwnProperty(this.currentLang) && this.lang[this.currentLang].hasOwnProperty(defaultKey) && this.lang[this.currentLang][defaultKey] != undefined) {
            return this.lang[this.currentLang][defaultKey];
          }
          else if (this.lang.hasOwnProperty('defaultLang') && this.lang['defaultLang'].hasOwnProperty(defaultKey) && this.lang['defaultLang'][defaultKey] != undefined) {
            return this.lang['defaultLang'][defaultKey];
          }
          else {
            return defaultKey;
          }
        }
        else {
          return key;
        }
      }
    }
  }
};


function JqLangPlugin() {
}
JqLangPlugin.prototype = new jquery_lang_js();
JqLangPlugin.prototype.convertWithParam = function (text, param, lang) {
  var tmpStr = this.convert(text, lang);
  var paramLen;
  if (param != undefined) {
    paramLen = param.length;
    for (var i = 0; i < paramLen; i++) {
      var searchStr = '{' + i + '}';
      tmpStr = tmpStr.replace(searchStr, param[i]);
    }
  }
  return tmpStr;
};

(function (global) {
  if (global.dashboardMui) {
    return;
  }
  var dashboardMui = {};
  dashboardMui.muiFunctions = new JqLangPlugin();

  dashboardMui.initLanguage = function (lang) {
    if (lang) {
      dashboardMui.muiFunctions.currentLang = lang;
      localStorage.setItem('langJs', lang);
    }
    else if(localStorage.getItem('langJs')){
      dashboardMui.muiFunctions.currentLang = localStorage.getItem('langJs');
    }
    else{
      dashboardMui.muiFunctions.currentLang = 'en';
      localStorage.setItem('langJs', 'en');
    }
    dashboardMui.muiFunctions.defaultLang = 'defaultLang';
    return lang;
  };


 /* dashboardMui.checkLangObjExist = function (objNameSpace) {
    var langObj = commonUtil.getObjFromString(window, objNameSpace);
    if (langObj != undefined) {
      if (!langObj['lang'])
        langObj.lang = {};
    }
  };
*/

  global.dashboardMui = dashboardMui;
})(this);
