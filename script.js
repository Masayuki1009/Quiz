const support = document.getElementById('support');
const hint = document.getElementById('hint');
const hintText = document.getElementById('hintText');
const choiceUseHint = document.getElementById('choiceUseHint')
const useHint = document.getElementById('use-hint')
const notUseHint = document.getElementById('not-use-hint')



const fiftyFifty = document.getElementById('fiftyFifty');
const choiceUseFiftyFifty = document.getElementById('choiceUseFiftyFifty');

const useFiftyFifty = document.getElementById('useFiftyFifty')
const notUseFiftyFifty = document.getElementById('notUseFiftyFifty')

const correct = document.getElementById('correct')
const good = document.getElementById('good')
const incorrect = document.getElementById('incorrect')
const bad = document.getElementById('bad')

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const scoreText = document.getElementById('score-text')
const scoreShowElement = document.getElementById('scoreShow')
const restartButton =document.getElementById('restartButton')

let Questions;
let currentQuestionIndex = 0;
let score = 0;

let isAnswered;
let alreadyUsedHint;
let alreadyUsedFiftyFifty;

function shuffle(arr) {
    //i を 1 ずつ前にずらしながらループ処理を行う(第八回参照)
    for (let i = arr.length - 1;/*配列の最後の要素のindex*/ i > 0; i--) {
                            /*↓0 から i 番目のランダムな整数値*/
        const j = Math.floor(Math.random() * (i + 1));// j: この範囲の中からランダムに選ぶ要素のインデックス
    [arr[j], arr[i]] = [arr[i], arr[j]]//arr[i] と arr[j] を入れ替える(このやり方を分割代入と呼ぶ)
    }

    return arr;
}

hint.addEventListener('click', () => {
    if (alreadyUsedhint === true) {
        return;
    }
    choiceUseHint.classList.remove('hide')
    checkUseHint()
})

function checkUseHint() {
    useHint.addEventListener('click', () => {
        alreadyUsedhint = true;
        hint.classList.add('used')
        hintText.innerText = Questions[currentQuestionIndex].hint
        choiceUseHint.classList.add('hide')
    })
    notUseHint.addEventListener('click', () => {
        choiceUseHint.classList.add('hide')
    })
}



function checkUseFiftyFifty(button) {
    useFiftyFifty.addEventListener('click', () => {
        alreadyUsedFiftyFifty = true;
        fiftyFifty.classList.add('used')
        if(button.innerText === Questions[currentQuestionIndex].answers[0]) {
            button.remove()
        } else if(button.innerText === Questions[currentQuestionIndex].answers[1]) {
            button.remove()
        }
        choiceUseFiftyFifty.classList.add('hide')
    })
    notUseFiftyFifty.addEventListener('click', () => {
        choiceUseFiftyFifty.classList.add('hide')
    })
}




startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    isAnswered = false
    currentQuestionIndex++
    hintText.innerText = " ";
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    support.classList.remove('hide')
    Questions = questions
    isAnswered = false
    alreadyUsedhint = false
    hint.classList.remove('used');
    hintText.innerText = " ";
    alreadyUsedFiftyFifty = false
    fiftyFifty.classList.remove('used')
    score = 0;
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}


function setNextQuestion() {
    resetState()
    showQuestion(Questions[currentQuestionIndex])
}
                        //↓(Questions[currentQuestionIndex])
function showQuestion(question) {
    questionElement.innerText = question.question;
    good.innerText = question.good
    bad.innerText = question.bad
    const shuffledChoices = shuffle([...question.answers])
    shuffledChoices.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn')
        button.addEventListener('click', () => {
            if (isAnswered === true) {
                return;
            }
            isAnswered = true;
            if(button.innerText === question.correct) {
                button.classList.add('correct');
                correct.classList.remove('hide')
                good.classList.remove('hide')
                score++;
            } else {
                incorrect.classList.remove('hide');
                bad.classList.remove('hide')
            }
            selectAnswer()
        })
        answerButtonsElement.appendChild(button)

        fiftyFifty.addEventListener('click', () => {
        if (alreadyUsedFiftyFifty === true) {
            return;
        }
        choiceUseFiftyFifty.classList.remove('hide')
        checkUseFiftyFifty(button)
    })
    })

}


function resetElements() {
    nextButton.classList.add('hide');
    correct.classList.add('hide');
    incorrect.classList.add('hide');
    good.classList.add('hide')
    bad.classList.add('hide')
}

function resetState() {
    resetElements()
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    if (Questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult()
    }
}

function showResult() {
    startButton.innerText = "結果発表～～！"
    startButton.classList.remove('hide')
    startButton.addEventListener('click', () => {
    scoreShowElement.classList.add('show')
    })

    scoreText.innerText = 'あなたの点数は' + score + '/' + Questions.length + '点！' ;

    restartButton.addEventListener('click', () => {
        scoreShowElement.classList.remove('show')
    })
}


const questions = [
    {
    question: '1.柴田雅之と一緒だった必修のクラス名は？',
    answers: ['SP1', 'SP3', 'SP2', 'SP4'],
    correct: 'SP2',
    good: '流石にここで間違えたらしばく',
    bad: '終わってんな',
    hint: 'アホかお前ヒントなんかいらんやろ',
    },{
    question: '2.れなの留学先はどこ？',
    answers: ['エストニア', 'アルメニア', 'ルーマニア', 'アルバニア'],
    correct: 'ルーマニア',
    good: '余裕やね',
    bad: 'おつかれ',
    hint: '不要',
    },{
    question: '3.SP2界隈で衝撃を与えたグラント。グラントのファーストネームのスペルは？',
    answers: ['Laura', 'Lily', 'Gillian', 'Daniel'],
    correct: 'Gillian',
    good: 'HURRAY!!!!!!',
    bad: 'LIU!!!!!!!! Gillian Grant デェェェェェス！',
    hint: '一番強そうなやつ',
    },{
    question: '4.UNTの学期ごとの授業数は週当たりいくつ？',
    answers: ['10', '14', '12', '16'],
    correct: '12',
    good: '早起きが辛かった',
    bad: 'なんでやねん。ちな答えは12',
    hint: '1限と2限は全部必修で更に+αあった。頭おかしい。',
    },{
    question: '5.SP2秋学期のUNTの先生の組み合わせは次のうちどれ',
    answers: ['Johanna/Laura/Josh', 'Johanna/Grant/Lindy', 'Johanna/Laura', 'Johanna/Laura/Lindy'],
    correct: 'Johanna/Laura',
    good: 'よう覚えてるな',
    bad: '答えは　JohannaとLaura　やで。秋学期は二人制で春は三人',
    hint: '秋学期の先生は二人だけやで',
    },{
    question: '6.オランダ、ロッテルダムの世界遺産である川沿いに風車が立ち並んでいる地名のスペルはどれ？',
    answers: ['Kendldijlk', 'Kainderdilk', 'Kinderdijk', 'Kendeldilk'],
    correct: 'Kinderdijk',
    good: '素晴らしい',
    bad: '答えは「Kinderdijk」でした。オランダ行きてぇ～',
    hint: '',
    },{
    question: '7.りゅうがオランダ留学中に泥酔したときに一気飲みした酒は次のうちどれ？',
    answers: ['ジン', 'テキーラ', 'マリブ', 'ウィスキー'],
    correct: 'マリブ',
    good: 'ブルガリアでボコられないように、お酒の飲み過ぎはほどほどに。',
    bad: '記憶が飛ぶ程飲まないようにしましょう。',
    hint: 'コーラと合わせるとうまい',
    },{
    question: '8.オランダ留学時、余りにも理解が出来ずりゅうに土下座してまで助けを求めた科目は次のうちどれ？',
    answers: ['Business Managament', 'Marketing', 'Excel', 'Finance'],
    correct: 'Excel',
    good: 'さすが張本人。あの説は教えて頂き誠にありがとうございました(土下座)',
    bad: 'んなアホな。土下座動画まで取ったのに？',
    hint: 'I was fucked up by Vlookup',
    },{
    question: '9.７号館の建物内部の普通じゃ入れないスペースに作業員のおじさんがいるという一風変わった光景に対し、わたくし柴田雅之はとあるツッコミをしました。さて何と言った？',
    answers: ['留年して卒業できなかった生徒の亡霊か！', 'ホログラムジジイ？', 'ゲームのバグかよ！', 'どの道通ったらそこいけんねん！'],
    correct: 'ゲームのバグかよ！',
    good: '覚えているくらい面白かったってことでおけ？',
    bad: '答えは「ゲームのバグかよ！」。確かこの時りゅうとれなとゆうきとおったはずやねんけどゆうきが死ぬほど笑ってた記憶ある',
    hint: '普段じゃありえない光景ってとこに焦点を当ててほしい',
    },{
    question: '10.私、柴田雅之はUNTのテストで一度だけクラストップの成績を取ったことがあります。この時、実は単独トップと思いきや一人だけ同じ点数を叩き出した生徒がいたのですが、それは誰でしょう？',
    answers: ['さき', 'れな', 'より', 'しゅんた'],
    correct: 'より',
    good: 'まさかこれを正解するとは。ちなこの時ホンマに単独トップかと思ってて割と悲しかった',
    bad: 'まぁこれは難問。答えはよりで、一人でイキってたら「俺も同じ点数やで？」ってクソ煽られて悲しかった',
    hint: '答えの人は、オランダには来たことがありません。',
    }
]