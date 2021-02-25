module.exports = function check1(str, bracketsConfig) {
    let n = str.length;
    //массив с одинаковыми скобками
    let theSameBracket = [];
    //формируем два массива с открывающимися и закрывающимися скобками - разными
    let arrOpen = [],
        arrClose = [];
    for (let i = 0; i < bracketsConfig.length; i++) {
        if (bracketsConfig[i][0] == bracketsConfig[i][1])
            theSameBracket.push(bracketsConfig[i][1]);
        //если в массиве скобок есть одинаковые открывающие и закрывающие скобки
        else {
            arrOpen.push(bracketsConfig[i][0]);
            arrClose.push(bracketsConfig[i][1]);
        }
    }
    //анализ строки
    let stack = [];
    //массив флагов появления одинаковой скобки
    let flag = [];
    let index;
    for (let i = 0; i < n; i++) {
        //если  встречаем одинаковую скобку
        index = theSameBracket.indexOf(str[i]);
        if (index != -1) {
            //если одинаковая скобка является открывающей
            if (!flag[index]) {
                flag[index] = true;
                stack.push(str[i]);
            } else {
                //если одинаковая скобка является закрывающей
                if (str[i] == stack[stack.length - 1]) {
                    stack.pop();
                    flag[index] = false;
                } else return false;
            }
            //любая другая скобка
        } else {
            if (arrOpen.includes(str[i])) stack.push(str[i]);
            else {
                if (stack.length == 0) return false;
                if (
                    str[i] == arrClose[arrOpen.indexOf(stack[stack.length - 1])]
                )
                    stack.pop();
                else {
                    return false;
                }
            }
        }
    }
    if (stack.length != 0) return false;
    else return true;
};
