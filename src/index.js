function eval() {
    // Do not use eval!!!
    return;
}

function calc(num1,num2,operation) {
        switch (operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 !== 0) {
                    return num1 / num2;
                } else {
                    throw new Error("TypeError: Division by zero.");
                }
            default:
                return 0;
        }
}

function chechOperation(inSymbol, steckNum, stecSymb) {
    const prior = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
}

function expressionCalculator(expr) {
//    expr = " 92 - 34 + 32 * (  (  (  89 - 87 / 11 / 66  ) / 49 + 2 / 76  ) / 93 / 45  ) * 92  ";
//    expr = '2*3';

    let exprArray = [];

    let steckNum = [];
    let steckSymb = [];

    let pIn = 0;
    let pSt = 0;
    let c = 0;
    let n = 0;

    let b = false;

    const prior = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    /* 1. Надо все записать в виде массива */
    exprArray = expr.match(/[*-/+()]|\d+/g);

    steckNum = expr.match(/[(]/g);
    steckSymb = expr.match(/[)]/g);

    if (Array.isArray(steckSymb) && Array.isArray(steckNum)) {
        if (steckNum.length !== steckSymb.length) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    } else {
        if (!Array.isArray(steckSymb) && Array.isArray(steckNum)) {
            throw new Error("ExpressionError: Brackets must be paired");
        } else if (Array.isArray(steckSymb) && !Array.isArray(steckNum)) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }

    steckNum = [];
    steckSymb = [];

//    console.log(exprArray);
//    steckNum.push(parseInt(exprArray[0]));
//    steckSymb.push(exprArray[1])

    for (let i = 0; i < exprArray.length; i++) {

        // console.log('Stack Number = ',steckNum);
        // console.log('Stack Symbol = ',steckSymb);
        // console.log('ExprArry[i]  = ',exprArray[i]);

       if (!isNaN(parseInt(exprArray[i])) ) {
           steckNum.push(parseInt(exprArray[i]));

       } else {
           if (steckSymb.length === 0) {
               steckSymb.push(exprArray[i]);

           } else {
               if ((exprArray[i] !== '(') && (exprArray[i] !== ')')) {
                   /* Проверяем приоритет входящего символа, если он <= приоритету верхнего в стеке, то работает со стеком */
//                   console.log('Символ на входе = ',exprArray[i], ' Приоритет = ', prior[exprArray[i]])
                   pIn = prior[exprArray[i]];

                   /* Работаем с текущим стеком */
                   b = true;
                   while (b) {
                       if (steckSymb.length === 0) { b = false; }

                       pSt = prior[steckSymb[steckSymb.length - 1]];

//                       console.log('Приоритет вход = ', pIn, ' Приоритет стек = ', pSt);

                       if ((pIn <= pSt) && (exprArray[i] !== '(')) {

                           c = calc(steckNum[steckNum.length - 2], steckNum[steckNum.length - 1], steckSymb[steckSymb.length - 1]);

                           steckNum.pop();
                           steckNum.pop();
                           steckNum.push(c);

                           steckSymb.pop();

                           // console.log('Stack Number 1 = ',steckNum);
                           // console.log('Stack Symbol 1 = ',steckSymb);

                       } else {
                           b = false;
                           steckSymb.push(exprArray[i]);
                       }
                   }

               } else if (exprArray[i] === ')') {
                    /* Должны обратотать стек символов до символа ( */
                   b = true;
                   while (b) {
                       if (steckSymb.length === 0) { b = false; }

                       if (steckSymb[steckSymb.length - 1] !== '(') {

                           c = calc(steckNum[steckNum.length - 2], steckNum[steckNum.length - 1], steckSymb[steckSymb.length - 1]);

                           steckNum.pop();
                           steckNum.pop();
                           steckNum.push(c);

                           steckSymb.pop();

                           // console.log('Stack Number 2 = ',steckNum);
                           // console.log('Stack Symbol 2 = ',steckSymb);

                       } else {
                           b = false;
                           steckSymb.pop();

                           // console.log('Stack Number 3 = ',steckNum);
                           // console.log('Stack Symbol 3 = ',steckSymb);
                       }
                   }

               }
               else {
                   steckSymb.push(exprArray[i]);

                   // console.log('Stack Number 4 = ',steckNum);
                   // console.log('Stack Symbol 4 = ',steckSymb);
               }
           }
       }

       if (i === exprArray.length - 1) {
            console.log('Stack Number 5 = ',steckNum);
            console.log('Stack Symbol 5 = ',steckSymb);

           b = true;
           while (b) {
               if (steckSymb.length === 0) { b = false; }

               c = calc(steckNum[steckNum.length - 2], steckNum[steckNum.length - 1], steckSymb[steckSymb.length - 1]);

               steckNum.pop();
               steckNum.pop();
               steckNum.push(c);

               steckSymb.pop();

               // console.log('Stack Number 6 = ',steckNum);
               // console.log('Stack Symbol 6 = ',steckSymb);

               if (steckSymb.length === 0) { b = false };
           }
       }
    }

    console.log(steckNum);

    return steckNum[0];
}

module.exports = {
    expressionCalculator
}
