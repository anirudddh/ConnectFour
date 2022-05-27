// +1 for RED, +2 for YELLOW
var gameOver = false;
var isRED = false;
var dropdiv;
var leftM, topM;
var layout = [ [0,0,0,0,0,0] , [0,0,0,0,0,0] , [0,0,0,0,0,0] , [0,0,0,0,0,0] , [0,0,0,0,0,0] , [0,0,0,0,0,0] , [0,0,0,0,0,0] ];
var map = [['ta','tb','tc','td','te','tf','tg'],['ba','bb','bc','bd','be','bf','bg'],['ca','cb','cc','cd','ce','cf','cg'],['da','db','dc','dd','de','df','dg'],['ea','eb','ec','ed','ee','ef','eg'],['fa','fb','fc','fd','fe','ff','fg'],['aa','ab','ac','ad','ae','af','ag']]
var maxDepth = [ 6 , 6 , 6 , 6 , 6 , 6 , 6 ];
var shadowMap = [ ['ra','rb','rc','rd','re','rf','rg'] , ['ya','yb','yc','yd','ye','yf','yg'] ];


$("document").ready(function(){
    
    $("#instr").on('click', function(){
        document.getElementById("instructions").style.display = "flex";
    });

    $("#close").on('click', function(){
        setTimeout(function(){document.getElementById("instructions").style.display = "none";}, 200)

    });
});

function showShadow(column){
    if(isRED){
        let item = document.getElementById(shadowMap[0][column]);
        item.style.display = 'block';
        //alert("SHOULDN'T BE CALLED");
    } else {
        let item = document.getElementById(shadowMap[1][column]);
        item.style.display = 'block';
    }  
}

function hideShadow(column){
    let item = document.getElementById(shadowMap[0][column]);
    item.style.display = 'none';
    
    item = document.getElementById(shadowMap[1][column]);
    item.style.display = 'none';
}

function initCoin(col){
    dropdiv = document.createElement("div");
    dropdiv.classList.add("dropdiv");

    if(isRED){
        dropdiv.style.backgroundColor='#ff6663';
    } else {
        dropdiv.style.backgroundColor='#fff656';
    }

    let parent = document.getElementById(map[maxDepth[col]][col]);    
    parent.appendChild(dropdiv);

    
}

function alertWinner(){
    console.log(layout);
    gameOver = true;
    if(isRED){
        iziToast.success({
            title: 'NOICE',
            message: 'Red is the winner!',
            color: '#ff6663',
            position: 'topCenter'
        });
    } else {
        iziToast.success({
            title: 'NOICE',
            message: 'Yellow is the winner!',
            color: '#fff656',
            position: 'topCenter'
        });
    }
    //location.reload();
}

function playAnotherQ(){
    iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        title: '',
        message: 'Would you like to play again?',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button>Ok</button>', function (instance, toast) {
                location.reload();
            }, true], // true to focus
            ['<button>Close</button>', function (instance, toast) {
                instance.hide({
                    transitionOut: 'fadeOutUp',
                    onClosing: function(instance, toast, closedBy){
                        showHomeScreen(); // The return will be: 'closedBy: buttonName'
                    }
                }, toast, 'buttonName');
            }]
        ],
        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
    });
}

function checkState(){
    let count;
    //HORIZONTAL CHECK
    for(let i=0; i<6; i++){
        count=1;
        for(let j=0; j<6; j++){
            if(layout[j][i] == layout[j+1][i]){
                count++;

                if(count==4){
                    if(layout[j][i]==2 || layout[j][i]==1){
                        alertWinner();
                        break;  
                    } else {
                        count = 1;
                    }
                }
            } else {
                count=1;
            }
        }
    }
    //VERTICAL CHECK
    if(!gameOver){
        for(let i=0; i<7; i++){
            count=1;
            for(let j=0; j<5; j++){
                if(layout[i][j] == layout[i][j+1]){
                    count++;
    
                    if(count==4){
                        if(layout[i][j]==2 || layout[i][j]==1){
                            alertWinner();
                            break;
                        } else {
                            count = 1;
                        }
                    }
                } else {
                    count=1;
                }
            }
        }
    }
    

    //DIAGONAL CHECK
    //1-1
    if(!gameOver){
        for(let i=3; i<=5; i++){
            let t;
            let u;
            count = 1;
            for(t=0, u=i; t<i, u>0; t++, u--){
                if(layout[t][u] == layout[t+1][u-1]){
                    count++;
    
                    if(count==4){
                        if(layout[t][u]==2 || layout[t][u]==1){
                            alertWinner();
                            break;  

                            
                        } else {
                            count = 1;
                        }
                    }
                } else {
                    count=1;
                }
            }
        }
    }

    //1-2
    if(!gameOver){
        for(let i=1; i<4; i++){
            let t;
            let u;
            count = 1;
            for(u=5, t=i; u>i-1, t<6; u--, t++){

                if(layout[t][u] == layout[t+1][u-1]){
                    count++;
    
                    if(count==4){
                        if(layout[t][u]==2 || layout[t][u]==1){
                            alertWinner();
                            break;
                            // location.reload();
                        } else {
                            count = 1;
                        }
                    }
                } else {
                    count=1;
                }
            }
        }
    }

    //2-1
    if(!gameOver){
        for(let i=3; i>=1; i--){
            let t;
            let u;
            count = 1;
            for(u=6-i, t=6; u>0, t>i; u--, t--){
                if(layout[u][t] == layout[u-1][t-1]){
                    count++;
    
                    if(count==4){
                        if(layout[u][t]==2 || layout[u][t]==1){
                            alertWinner();
                            break;
                            // location.reload();
                        } else {
                            count = 1;
                        }
                    }
                } else {
                    count=1;
                }
            }
        }
    }

    //2-2
    if(!gameOver){
        for(let i=1; i<4; i++){
            let t;
            let u;
            count = 1;  
            for(u=0, t=i; u<6-i, t<6; u++, t++){
                if(layout[t][u] == layout[t+1][u+1]){
                    count++;
    
                    if(count==4){
                        if(layout[t][u]==2 || layout[t][u]==1){
                            alertWinner();
                            break;
                            // location.reload();
                        } else {
                            count = 1;
                        }
                    }
                } else {
                    count=1;
                }
            }
        }
    }

    if(gameOver){
        playAnotherQ();
    }

    isRED = !isRED;
    console.log(layout);

}

function alertMaxLimit(){
    
    iziToast.error({
        title: 'Error',
        message: 'Column is full',
        position: 'topCenter'
    });

}

function dropCoin(col){
    if(maxDepth[col]>0){
        initCoin(col);

        if(isRED){
            layout[col][maxDepth[col]-1]++;
        } else {
            layout[col][maxDepth[col]-1]++;
            layout[col][maxDepth[col]-1]++;
        }
        maxDepth[col]--;
        checkState();
    } else {
        alertMaxLimit();
    }
}


