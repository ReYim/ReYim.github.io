/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Global Variables */

const subID = jsPsych.randomization.randomID(8)


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function () {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        // document.body.onselectstart = function () { return false } // 禁止选中文字 <body oncontextmenu="return false">
        // document.body.oncontextmenu = function () { return false } // 禁用鼠标右键 <body onselectstart="return false">
        // document.onkeydown = function () {
        //     // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
        //     if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
        //         (event.ctrlKey && event.keyCode in { 85: 'U' })
        //     ) { return false }
        // }
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: center; line-height: 1.6em">
    <b>
   ھەربىر سۇئالنى ئەستايىدىللىق بىلەن ئوقۇپ ، يېقىنقى ئىككى ھەپتىلىك ئەمىلىي ئەھۋالىڭىزغا قارىتا، ھېچنىمىدىن ئەنسىرىمەي بىرىنجى ئىنكاسىڭىز بويىچە جاۋابنى تاللاڭ <br/>
    </b>
    </p>`,
    button_label: 'داۋاملاشتۇرۇش',
    delay_after: 0
}



var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Surveys */

var Sex = {
    type: 'html-button-response',
    data: { varname: 'Sex' },
    stimulus: 'جىنسىڭىز',
    choices: ['باشقا', 'قىز', 'ئوغۇل'],
    on_finish: function (data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: 'يېشىڭىز',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
    button_label: 'داۋاملاشتۇرۇش',
    on_finish: function (data) { addRespFromSurvey(data) }
}

//         （1 = 完全不会，2 = 好几天，3 = 一半以上的天数，4 = 几乎每天）</p>`,
var RSES = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        بىرىنجى ئىنكاسىڭىز بويىچە جاۋابنى تاللاڭ<br/>
        <br/>قەتئىي ئۇنداق ئىش يوق = 1
        <br/>نەچچە كۈندە بىر = 2
        <br/>ئككى كۈندە بىر = 3
        <br/>كۈندە = 4
    
        </p>`,
        choices: ['1', '2', '3', '4'],
        on_finish: function (data) { addRespFromButtonScale(data, 'RSES') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: 'بىرەر ئشقا قىزىقىش يوق ياكى قىلغىڭىز كەلمەيدۇ' },
        { data: { i: 2 }, s: 'كەيپىياتىڭىز چۈشكۈن كۆڭلىڭىز يېرىم ياكى ئۈمۈتسىزلىك' },
        { data: { i: 3 }, s: 'ئۇيقىڭىز كەلمەيدۇ ياكى كۆپ ئۇخلىۋېتىسىز' },
        { data: { i: 4 }, s: 'ھارغىن ياكى ماغدۇرسىزلىق ھېس قىلىسىز' },
        { data: { i: 5 }, s: 'ئشتىھارىڭىز يوق ياكى كۆپ يەۋېتىسىز' },
        { data: { i: 6 }, s: 'ئۆزىڭىزنى مەغلۇبىيەتچى ھېساپلايسىز، ياكى ئائىلىڭىزدىكىلەرنىڭ ئۈمۈدىنى يەردە قويغاندەك ھېس قىلىسىز' },
        { data: { i: 7 }, s: 'ئىش قىلغاندا ياكى تېلۋىزور كۆرگەندە دىققەتنى يىغالمايسىز' },
        { data: { i: 8 }, s: 'سۆز ۋە ھەرىكەت كۆرۈنەرلىك ئاستا ياكى بەكلا تېز ، تېرىكىپ،  جايىدا جىم ئولتۇرۇش قېيىن' },
        { data: { i: 9 }, s: 'ئۈلىۋېلىش ياكى مەلۇم ئۇسۇلدا ئۆزىڭىزگە زىيان يەتكۈزگىڭىز كېلىدۇ' },
    ],
    randomize_order: false
}

/* Combine Timelines */

var demographics = {
    timeline: [
        Sex, Age,
    ]
}

var surveys = {
    timeline: [
        RSES,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    demographics,
    surveys,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function () {
        jsPsych.data.get().localSave('csv', `抑·预自测_${subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += 'سىناق ئاخىرلاشتى، خادىملارنىڭ سىز بىلەن ئالاقىلىشىشىنى ساقلاڭ'
        // document.getElementById('jspsych-content').innerHTML += '自测结束，请等待工作人员联系您。'
    }
})