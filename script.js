const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableA = document.querySelector('.tableOfMatrixA');
const vertexValue = document.querySelector('.vertexInput');
const nameOfMatrixA = document.querySelector('.nameOfMatrixA');
const lines = document.querySelector('.lines');

btnCreate.addEventListener('click', getValue);
dataEntry.addEventListener('click', deleteBlock);

function getValue() {
    const valueOfInput = vertexValue.value;
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outLinesAndMatrixA);
}

function deleteBlock(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
}

function outLinesAndMatrixA() {
    const valueOfInput = vertexValue.value;

    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    let arr = [];

    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }

    let mas = [];

    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        for (let c = 0; c < dataOfInputs.length + 1; c++) {
            if (i === 0) { }
            else {
                if (c == 0) { }
                else {
                    if (arr[i - 1].indexOf(c) != -1) {
                        mas.push(1)
                    }
                    else {
                        mas.push(0);
                    }
                }
            }
        }
    }

    mas = mas.map((_, i, a) => a.slice(i * valueOfInput, i * valueOfInput + valueOfInput)).filter((el) => el.length);

    for(let i = 0; i < valueOfInput; i++) {
        for(let j = 0; j < valueOfInput; j++) {
            if (mas[i][j] != 1) {
                mas[i][j] = '*';
            }
        }
    }

    for(let i = 0; i < valueOfInput; i++) {
        for(let j = 0; j < valueOfInput; j++) {
            if (mas[i][j] == 1) {
                mas[i][j] = i + 1;
            }
        }
    }

    let tmp = [];
    let newMasForA = [];
    for(let i = 0; i < valueOfInput; i++) {
        for(let j = 0; j < valueOfInput; j++) {
            if (mas[j][i] != '*') {
                tmp.push(mas[j][i]);
            }
        }
        newMasForA.push(tmp);
        tmp = [];
    }


    let chamenaArr = arr.slice();

    arr = newMasForA.slice(0);

    let lineArr = [];
    let temp = [];


    let n = 0;
    while(checkOnEnd(arr) != true && n < 70) {
        for(let i = 0; i < arr.length; i++) {
            if(onEmpty(arr[i])) {
                temp.push(i + 1);
                arr[i] = '*';
            }
        }
    
        for(let i = 0; i < arr.length; i++) { // очистка
            for(let j = 0; j < arr[i].length; j++) {
                if(temp.indexOf(arr[i][j]) != -1) {
                    arr[i][j] = '';
                }
            }
        }
    
        lineArr.push(temp);
        temp = [];
        n++;
    }

    lines.textContent = '';
    let doop = 1;
    let objArr = {};
    for (let i = 0; i < lineArr.length; i++) {
        let str = lineArr[i].map((e) => {
            objArr[`${e}`] = doop;
            return e + `(${doop++})`;
        });
        lines.insertAdjacentHTML('beforeend',
        `
        <div class="line">
            <div class="level">Уровень ${i}</div>
            <div class="outNewVertex">${str}</div>
        </div>
        `
        )
    }

    let newObjForArr = chamenaArr.slice(0);

    for(let i = 0; i < newObjForArr.length; i++) {
        for(let j = 0; j < newObjForArr[i].length; j++) {
            newObjForArr[i][j] = (objArr[newObjForArr[i][j]]);
        }
    }

    mas = [];
    for(let el in newObjForArr) {
        mas[objArr[el * 1 + 1]] = newObjForArr[el];
    }

    for(let i = 0; i < mas.length; i++) {
        mas[i] = mas[i + 1];
    }
    mas = mas.filter(function(x) {
        return x !== undefined && x !== null; 
    });


    // matrix A

    dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);
    console.log('dataOfInputs', dataOfInputs);
    arr = [];

    for (let t = 0; t < dataOfInputs.length; t++) {
        arr[t] = dataOfInputs[t].split(' ');
    }
    for (let el in arr) {
        arr[el] = arr[el].map(parseFloat);
    }
    arr = mas;
    console.group(arr);
    console.groupEnd();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < dataOfInputs.length + 1; c++) {
            if (i === 0) {
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; 
                }
                else {
                    th.textContent = c; 
                }
                tr.appendChild(th);
            }
            else { // все остальные
                if (c == 0) { // 
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    if (arr[i - 1].indexOf(c) != -1) {
                        td.textContent = 1;
                    }
                    else {
                        td.textContent = 0;
                    }
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr);
    }
    nameOfMatrixA.style.display = 'block';
    tableA.textContent = '';
    tableA.appendChild(fragment);
}

function onEmpty(arr) {
    if (arr == '') return true;
    let bool = false;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == '') {
            bool = true
        }
        else {
            return false;
        }
    }

    return bool;
}

function checkOnEnd(arr) {
    let bool = true;
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] != '*') {
            bool = false;
        }
    }
    return bool;
}