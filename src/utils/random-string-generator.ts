export function randomString() {
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz123456789";
    const length = options.length ;

    let ans = "";

    for(let i = 0 ; i == 32 ; i++){
        ans += options[Math.floor((Math.random() * length))]
    }

    return ans;
}