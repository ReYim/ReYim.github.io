/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Custom JS Functions */

// NOTE: When using JS functions, parameters should be defined in order!

function keyCode(character) {
    return jsPsych.pluginAPI.convertKeyCharacterToKeyCode(character)
}

function inputDialog(title, default_text) {
    var input = prompt(msg = title, defaultText = default_text)
    return input
}

function timer() {
    var second = document.getElementById('timer')
    var button = document.getElementsByClassName('jspsych-btn')[0]
    if (second != null) {
        if (second.innerHTML > 1) {
            second.innerHTML = second.innerHTML - 1
        } else {
            button.innerHTML = '继续'
            button.disabled = false
        }
    }
}

//写入cookie函数
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function choicesLanguage(language) {
    jsPsych.language = parseInt(language.button_pressed) + 1;
}

function addRespFromButton(data) {
    // compute variables from button-plugin response (for simple item)
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromButtonScale(data, scale_name, var_i = 'i') {
    // compute variables from button-plugin response (for likert scale)
    data.scale = scale_name
    data.varname = scale_name + data[var_i]
    data.response = parseInt(data.button_pressed) + 1 // raw: 0, 1, 2, ...
}

function addRespFromSurvey(data, parse_int = false) {
    // only for single response ('Q0' in survey-plugin responses)
    var resp = String(JSON.parse(data.responses).Q0)
    data.responses = resp
    data.response = (parse_int) ? resp.match(/\d+/) : resp
}

function replaceComma(data, sep = '|') {
    // only for single response ('Q0' in survey-plugin responses)
    data.responses = String(JSON.parse(data.responses).Q0).split(',').join(sep)
}

function setSliderAttr(event = 'onmouseup') {
    document.getElementById('jspsych-html-slider-response-response').setAttribute(event, 'addSliderValue()')
}

function addSliderValue(element_id = 'slider-value') {
    document.getElementById(element_id).innerHTML = document.getElementById('jspsych-html-slider-response-response').value
    document.getElementById('jspsych-html-slider-response-next').disabled = false
}

function MEAN(scale_name, rev = [0], likert = [1, 7], var_i = 'i', var_response = 'response') {
    var df = jsPsych.data.get().filter({ scale: scale_name }).values() // raw data array (modifiable)
    var sum = 0
    for (var i in df) { // or: for (var i = 0; i < df.length; i++) {...}
        // df[i][j] or df[i]['varname'] or df[i].varname
        if (rev.includes(df[i][var_i]) == false) {
            sum += df[i][var_response]
        } else {
            sum += likert[0] + likert[1] - df[i][var_response]
        }
    }
    return sum / df.length
}


/* JS Functions from the R package 'jspsychr' */

save_locally = function () {
    var data = jsPsych.data.get().csv()
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'submit')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({ filedata: data }))
};