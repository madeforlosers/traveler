const fs = require("fs");
const prompt = require("prompt-sync")();
var file = fs.readFileSync("index.trav","utf8");

var backupAns = 0;
var ans = 0;
var args = [0,0,0,0];
var vars = Array(10).fill(0);
var i = 0;
var whlayers = [];
for(i; i < file.length; i++){
    lets = file[i];
    if(lets.match(/[0-9]/g) != null){
        backupAns = ans;
        ans = parseInt(lets);
    }
    if("!@#$%^&*()".includes(lets)){
        vars[")!@#$%^&*(".indexOf(lets)] = parseFloat(ans);
    }

    switch(lets.toLowerCase()){
        case "v":
            backupAns = ans;
            ans = vars[ans];
            break;
        case "z":
            args[0] = ans;
            ans = backupAns;
            break;
        case "a":
            backupAns = ans;
            ans += args[0];
            break;
        case "s":
            backupAns = ans;
            ans -= args[0];
            break;
        case "m":
            backupAns = ans;
            ans *= args[0];
            break;
        case "d":
            backupAns = ans;
            ans /= args[0];
            break;
        case "e":
            backupAns = ans;
            ans **= args[0];
            break;
        case "o":
            process.stdout.write(ans.toString());
            break;
        case "r":
            backupAns = ans;
            ans %= args[0];
            break;
        case "c":
            backupAns = ans;
            ans = (ans == args[0]);
            break;
        case "y":
            backupAns = ans;
            ans = (ans <= args[0]);
            break;
        case "n":
            backupAns = ans;
            ans = !ans;
            break;
        case "x":
            if(!ans){
                let j = i;
                let layer = 1;
                while(file[j] != "p" || layer != 0){
                    
                    j++;
                    if(file[j] == "x")layer++;
                    if(file[j] == "p")layer--;
                    //console.log(file[j],layer)
                }
                i=j;
            }
            break;
        case "w":
            // console.log(ans)
            whlayers.unshift(i);
            if(whlayers[0] == whlayers[1]){
                    whlayers.shift();
            }
            //console.log(whlayers)
            if(!ans){
                whlayers.shift();
               
                let j = i;
                let layer = 1;
                while(file[j] != "g" || layer != 0){
                    
                    j++;
                    if(file[j] == "w")layer++;
                    if(file[j] == "g")layer--;
                    //console.log(file[j],layer)
                }
                i=j;
            }
            break;
        case "g":
            //console.log("!")
            i = whlayers[0]-1;
            break;
        case "q":
            backupAns = ans;
            ans = parseFloat(prompt(">"));
            break;
        case "i":
            backupAns = ans;
            ans = parseInt(ans);
    }
    if(lets.toUpperCase() === lets && lets.match(/[A-z]/g) != null){
        console.log(ans);
    }
     
}
