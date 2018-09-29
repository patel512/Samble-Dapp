/**
 * A simple function to update text on the sample HTML page.
 * @param {string} message: Message to update on the UI 
 */
function updateMessage(message) {
    let hone = document.getElementById('message');
    hone.innerHTML = message;
}

function showname(message) {
    let hone = document.getElementById('viewname');
    hone.innerHTML = message;
}


function showsymbol(message) {
    let hone = document.getElementById('showsymbol');
    hone.innerHTML = message;
}

function showbalance(message) {
    let hone = document.getElementById('showbalance');
    hone.innerHTML = message;
}

function showowner(message) {
    let hone = document.getElementById('showowner');
    hone.innerHTML = message;
}

function showpendingToken(message) {
    let hone = document.getElementById('showPending');
    hone.innerHTML = message;
}




window.addEventListener('load', function () {

    document.getElementById("getname").addEventListener('click',function(){
        api.getName((err, res) => {
            console.log("this is for console",res);
            showname(res);
        })
    })

    document.getElementById("owner").addEventListener('click',function(){
        api.owner((err, res) => {
            console.log("this is for console",res);
            showowner(res);
        })
    })

    document.getElementById("getsymbol").addEventListener('click',function(){
        api.getSymbol((err, res) => {
            console.log("this is for console",res);
            showsymbol(res);
        })
    })


    document.getElementById("chckavlbl").addEventListener('click',function(){
        value =  document.getElementById("balance").value;
        api.balanceOf(value,(err,respo)=>{
            console.log("In console respo is ",respo);
            showbalance(respo);
        })
    })


 
    document.getElementById("mint").addEventListener('click',function(){
        value1 =  document.getElementById("addr").value;
        value2 =  document.getElementById("bal").value;
        console.log(value1,value2);
        api.mint(value1,value2, (err,respo)=>{
            console.log("err is ===>",err);
            console.log(respo);
        })
    })


    document.getElementById("trnsfrtok").addEventListener('click',function(){
        value =  document.getElementById("addr2").value;
        value2 = document.getElementById("bal2").value;
        api.transferTo(value,value2,(err,respo)=>{
            console.log("err is ===>",err);
            console.log("respo is =====>",respo);
        })
    })

})