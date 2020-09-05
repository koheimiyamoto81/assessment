'user strict';
/*
user strict Defines that JavaScript code should be executed in "strict mode".
=> Strict mode makes it easier to write "secure" JavaScript.
Strict mode changes previously accepted "bad syntax" into real errors.
As an example, in normal JavaScript, mistyping a variable name creates a new global variable. 
In strict mode, this will throw an error, making it impossible to accidentally create a global variable.
*/

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDiv = document.getElementById('result-area');
const tweetDiv = document.getElementById('tweet-area');

// assessmentButton.onclick = function(){
//     console.log('bottun clicked.');
//     //todo result area
//     //todo tweet area
// }

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }
  
// typing 'Enter' connects to assessmentButton.onclick()
userNameInput.onkeydown = event =>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

//arrow function for ES6
assessmentButton.onclick = () =>{
    const userName = userNameInput.value;
    if (userName === ""){
        console.warn("nothing is entered.");
        return; //return witout anything means "stop there"
    } //if nothing is entered, stop this function.
    console.log(userName + ' is entered.');

    //result area
    removeAllChildren(resultDiv);
    const header = document.createElement('h3');
    header.innerText = 'Result';
    resultDiv.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDiv.appendChild(paragraph);

    //Tweet area
    removeAllChildren(tweetDiv);
    const anchor = document.createElement('a');
    const hrefVal = 'https://twitter.com/intent/tweet?button_hashtag=yourStrength&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefVal);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #yourStrength';
    tweetDiv.appendChild(anchor);

    //widjet.js setting
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDiv.appendChild(script);
}


const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

//cosnst is global constant 
//let is local variable valid only inside {}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName username
 * @return {string} result of assessment
 */
//=>the way of writing like above is called "JSDoc"
//=>it explains the following fuction
//=>this JSdoc says the parameter and retun value of following function is both String. 

/*
since JS cannot clarify the data type, this JSDocs is important 
to let the programmer understand the interface.
*/

 function assessment(userName){
     //summing up the ascii code of userName
     let sumOfCharCode = 0;
     for (let i=0; i<userName.length; i++){
         sumOfCharCode += userName.charCodeAt(i);
     }

     const index = sumOfCharCode % answers.length;
     let result = answers[index];
     result = result.replace(/\{userName\}/g, userName);
     //"replace" function: to replace the String

     return result;
 }

 //test code below;
 console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
