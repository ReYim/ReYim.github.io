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
    请仔细阅读每一条目，然后根据最近两个星期以内你的实际感受，选择一个与你的情况最符合的答案。请不要有所顾忌，应该根据自己的真实体验和实际情况来回答，不要花费太多时间去思考，应顺其自然，根据第一印象做出判断。 <br/>
    </b>
    </p>`,
    button_label: '继续',
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
    stimulus: '您的性别',
    choices: ['男', '女', '其他'],
    on_finish: function (data) { addRespFromButton(data) }
}

var Age = {
    type: 'survey-html-form',
    data: { varname: 'Age' },
    preamble: '您的年龄',
    html: `
    <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
    oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
    button_label: '继续',
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
        根据第一印象做出判断<br/>
        <br/>完全不会 = 1
        <br/>好几天 = 2
        <br/>一半以上的天数 = 3
        <br/>几乎每天 = 4
    
        </p>`,
        choices: ['1', '2', '3', '4'],
        on_finish: function (data) { addRespFromButtonScale(data, 'RSES') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '做事时提不起劲或没有兴趣' },
        { data: { i: 2 }, s: '感到心情低落，沮丧或绝望' },
        { data: { i: 3 }, s: '入睡困难，睡不安稳或睡眠过多' },
        { data: { i: 4 }, s: '感觉疲倦或没有活力' },
        { data: { i: 5 }, s: '食欲不振或吃太多' },
        { data: { i: 6 }, s: '觉得自己很糟或觉得自己很失败，或让自己或家人失望' },
        { data: { i: 7 }, s: '对事物专注有困难，例如阅读报纸或看电视时' },
        { data: { i: 8 }, s: '动作或说话速度缓慢到别人已经察觉？或正好相反，烦躁或坐立不安、动来动去的情况更胜于平常' },
        { data: { i: 9 }, s: '有不如死掉或用某种方式伤害自己的念头' },
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
        document.getElementById('jspsych-content').innerHTML += '自测结束，请等待工作人员联系您。'
    }
})