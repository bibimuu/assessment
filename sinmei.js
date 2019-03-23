(function(){
    'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    }


    removeAllChildren(resultDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph)

    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('職業診断')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText ='Tweet #職業診断';
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();

    
    
};

const answers = [
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
'{userName}のいいところは声です。だから歌手じゃない？',
'{userName}のいいところはまなざしです。だから俳優じゃない？',
'{userName}のいいところは情熱です。だから弁護士とか？',
'{userName}のいいところは厳しさです。だから先生しかないでしょw',
'{userName}のいいところは知識です。だから学者とかええんちゃう？',
'{userName}のいいところはユニークさです。お笑い目指しなはれ。',
'{userName}のいいところは用心深さです。お留守番のニートだね。',
'{userName}のいいところは見た目です。モデルしてみなや。',
'{userName}のいいところは決断力です。お菓子選ぶ名人とかどうかな？',
'{userName}のいいところは思いやりです。主婦とかええんちゃう？',
'{userName}のいいところは感受性です。絵描きとかどうかな？。',
'{userName}のいいところは節度です。節約評論家になりなよ！',
'{userName}のいいところは好奇心です。ユーチューバーがいいかもしれないね。',
'{userName}のいいところは気配りです。ティッシュ配りの人とか向いてるんじゃないかな？',
'{userName}のいいところはその全てです。なんでもなれるさw',
'{userName}のいいところは自制心です。ちょっと思いつかんな。。。',
]

   /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
   function assessment(userName) {
    let sumOfcharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    
    const index = sumOfcharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);

    return result;
    }
    
    
})();

