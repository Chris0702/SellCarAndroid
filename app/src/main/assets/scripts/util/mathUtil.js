(function (global) {
    if (global.mathUtil) {
        return;
    }
    var mathUtil = new Object();

    mathUtil.isGEWithTol = function (a, b, tlr) {
      return (((a - b) >= 0) || ((a + tlr) >= b))
    };

    mathUtil.isLEWithTol = function (a, b, tlr) {
      return (((a - b) <= 0) || ((a - tlr) <= b))
    };


    mathUtil.isEWithTol = function (a, b, tlr) {
      return (Math.abs(a - b) <= tlr)
    };

    mathUtil.roundToDigit = function (val, digit) {
        if (val != undefined && digit != undefined && digit >= 0) {
            var tempMul = Math.pow(10, digit);
            val *= tempMul;
            val = Math.round(val);
            val /= tempMul;
        }
        return val;
    };

    mathUtil.sign = function (x) {
        if (!$.isNumeric(x)) {
            return NaN;
        } else if (x * 1 === 0) {
            return x;
        } else {
            return (x * 1 > 0 ? 1 : -1);
        }
    };

    mathUtil.toUint32 = function (x) {
        return x >>> 0;
    };

    mathUtil.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };

    mathUtil.dspFmtVal = function (format, value) {
    if (typeof(format) == "undefined") {
      format = '4.2';
    }
    var numForm = format.toString().split(".");
    /*var valueTxt = value.toString().split(".");
     if (valueTxt[0].length > numForm[0] * 1) { valueTxt[0] = valueTxt[0].slice(numForm[0] * (-1)); }
     if (numForm.length > 1 && valueTxt.length > 1)
     if (valueTxt[1].length > numForm[1] * 1) { valueTxt[1] = valueTxt[1].slice(0, numForm[1] * 1); }

     if (numForm.length > 1 && valueTxt.length > 1)
     { value = valueTxt[0] * 1 + valueTxt[1] / Math.pow(10, numForm[1] * 1); }
     else { value = valueTxt[0] * 1; }*/
    if ($.isNumeric(value)) {
      if (numForm.length == 2) {
        value = mathUtil.ftosn(value, numForm[0] * 1, numForm[1] * 1);
      } else {
        value = mathUtil.ftosn(value, numForm[0] * 1, 0);
      }
    }
    return value;
  };

  mathUtil.ftosn = function (fval, intl, frac) {
    if (!$.isNumeric(fval)) {
      return undefined;
    } else {
      fval = fval * 1;
    }
    if (!$.isNumeric(intl)) {
      intl = 0;
    }
    if (!$.isNumeric(frac)) {
      frac = 0;
    }
    var res;
    var sign = 0,
      tlen, dec, pad;

    if (mathUtil.sign(fval) < 0) {
      sign = 1;
    }

    if (!$.isNumeric(mathUtil.log10(fval))) {
      dec = 1;
    } else {
      dec = Math.floor(mathUtil.log10(fval)) + 1;
    }
    //hex
    if (!(intl + frac)) {
      res = mathUtil.toUint32(fval + (1 / 2)).toString(16).toUpperCase();
      return res;
    }
    //add dot length
    if (frac)
      tlen = intl + frac + 1;
    else
      tlen = intl;


    if (dec + sign > tlen) {
      if (tlen - 4 - sign > 0) {
        res = fval.toExponential(tlen - 4 - sign);
        return res;
      }
      res = '';
      for (var i = 0; i < tlen; i++) {
        res += '!';
      }
      return res;
    } else {
      if (frac) {
        res = Math.round(fval * Math.pow(10, frac * 1)) / Math.pow(10, frac * 1);
        res = res.toFixed(frac * 1) * 1;
        if ((tlen - dec - sign) * 1 < frac * 1) {
          res = Math.floor(res * Math.pow(10, (tlen - dec - sign) * 1)) / Math.pow(10, (tlen - dec - sign) * 1);
          res = res.toFixed((tlen - dec - sign) * 1) * 1;
        }
        return res;
      } else {
        res = Math.round(fval).toFixed(0);
        return res;
      }
    }
    res = fval;
    return res;
  };

    global.mathUtil = mathUtil;
})(this);
