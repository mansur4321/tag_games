var vue = new Vue({
    el: '#app',
    data() {
        return {
            tableСells: [//массив для поиска пустого места
                [1, 2, 3, 4], 
                [5, 6, 7, 8], 
                [9, 10, 11, 12], 
                [13, 14, 15, '']
            ],
            tableValues: [],//массив для отображения таблицы 

            clickValue: 0,

            winnerState: false,
        }
    },

    created: function() {
        let arr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']];

       // если хотите проверить на возможность победы, но лень играть, закомментируйте этот цикл
       //и парой кликов победите
        let indexI = 3;
        let indexJ = 3;

        for (let i = 0; i < 3000; i++) {
            let rnd1 = Math.floor(Math.random() * 2);
            let rnd2 =Math.floor(Math.random() * 2); 

            if (rnd1 == 1) {
                n = rnd1;
            } else {
                n = -1;
            }

            if (rnd2 == 1) {
                m = rnd2;
            } else {
                m = -1;
            }

            if (n + indexI < 4 && n + indexI > -1) {
                indexI += n;
                let c = arr[indexI][indexJ];
                arr[indexI][indexJ] = arr[indexI - n][indexJ];
                arr[indexI - n][indexJ] = c;
                continue;
            }

            if (m + indexJ < 4 && m + indexJ > -1) {
                indexJ += m;
                let c = arr[indexI][indexJ];
                arr[indexI][indexJ] = arr[indexI][indexJ - m];
                arr[indexI][indexJ - m] = c;
                continue;
            }

        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let newValue = {
                    value: arr[i][j],
                }

                this.tableСells[i][j] = arr[i][j];
                this.tableValues.push(newValue)
            }
        }
    },

    computed: {
        event() {
            return this.winnerState ? null : "click";
        },
    },

    methods: {
        nullData() {
            this.tableСells = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']];
            this.tableValues = [];
            this.winnerState = false;
        },

        arrayRandomization(arr) {
            let indexI = 3;
            let indexJ = 3;

            for (let i = 0; i < 3000; i++) {
                let rnd1 = Math.floor(Math.random() * 2);
                let rnd2 = Math.floor(Math.random() * 2); 

                if (rnd1 == 1) {
                    n = rnd1;
                } else {
                    n = -1;
                }

                if (rnd2 == 1) {
                    m = rnd2;
                } else {
                    m = -1;
                }

                if (n + indexI < 4 && n + indexI > -1) {
                    indexI += n;
                    let c = arr[indexI][indexJ];
                    arr[indexI][indexJ] = arr[indexI - n][indexJ];
                    arr[indexI - n][indexJ] = c;
                    continue;
                }

                if (m + indexJ < 4 && m + indexJ > -1) {
                    indexJ += m;
                    let c = arr[indexI][indexJ];
                    arr[indexI][indexJ] = arr[indexI][indexJ - m];
                    arr[indexI][indexJ - m] = c;
                    continue;
                }

            }


            return arr;
        },

        startAgain() {
            let arr = this.arrayRandomization(this.tableСells);

            this.nullData();


            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let newValue = {
                        value: arr[i][j],
                    }

                    this.tableСells[i][j] = arr[i][j];
                    this.tableValues.push(newValue)
                }
            }
        },

        searchIndex(value) {
            let n, m;
            this.clickValue = value;


            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.clickValue == this.tableСells[i][j]) {
                        n = i;
                        m = j;
                    }
                }
            }


            this.searchVoid(n, m)
        },

        searchVoid(n, m) {//осуществляем проверку значений выше ниже справа и слева от выбранной ячейки
            let j = -1;
            

            for (let i = 0; i < 2; i++) {

                if (n + j < 4 && n + j > -1) {

                    if (this.tableСells[n + j][m] == ''){
                        this.valueExchange(n, m, n + j, m);
                    }
                }
                if (m + j < 4 && m + j > -1) {
                    
                    if (this.tableСells[n][m + j] == ''){
                        this.valueExchange(n, m, n, m + j);
                    }
                }


                j += 2;
            }
        },

        valueExchange(n, m, i, j) {//n, m индексы ячейки на которую нажали; i, j индексы ячейки с пустотой
            //поменял местами значения в двойном массиве
            this.tableСells[n][m] = this.tableСells[i][j];
            this.tableСells[i][j] = this.clickValue;

            //поменял местами значения в массиве отображения
            let indexVoid = this.tableValues.findIndex(num => num.value == this.tableСells[n][m]);
            let indexValue = this.tableValues.findIndex(num => num.value == this.clickValue)
            this.tableValues[indexValue].value = this.tableСells[n][m];
            this.tableValues[indexVoid].value = this.clickValue;

            this.victory()
        },

        victory() {
            let checkArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];


            if (this.tableValues.length == checkArray.length) {

                for (var i = 0; i < this.tableValues.length; i++) {

                    if (this.tableValues[i].value !== checkArray[i]) {
                        return
                    }
                }
                

                this.winnerState = true;
            }
        }
    },
}
)
